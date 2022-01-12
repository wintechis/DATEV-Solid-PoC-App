import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, filter, map, Observable, switchMap } from 'rxjs';
import { UserService } from 'src/app/auth/services/user.service';
import { Buchung } from '../interfaces/Buchung.interface';
import { BuchungenService } from '../services/buchungen.service';
import { AddBuchungDialogComponent } from './add-buchung-dialog/add-buchung-dialog.component';
import { AuthBuchungenDialogComponent } from './auth-buchungen-dialog/auth-buchungen-dialog.component';

@Component({
  selector: 'app-buchungen',
  templateUrl: './buchungen.component.html',
  styleUrls: ['./buchungen.component.scss'],
})
export class BuchungenComponent {
  public hasButtons: Observable<boolean>;

  @Output()
  public add = new EventEmitter<Buchung>();

  @Input()
  set buchungen(value: Buchung[] | null) {
    if (value) {
      this._buchungen = value;
    }
  }

  get buchungen() {
    return this._buchungen;
  }

  private _buchungen: Buchung[] = [];

  constructor(
    private buchungenService: BuchungenService,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.hasButtons = combineLatest([
      this.userService.isAtNordwind(),
      this.userService.isAtFraunhofer(),
    ]).pipe(map(([nordwind, developer]) => nordwind || developer));
  }

  public addBuchung() {
    let dialogRef = this.dialog.open(AddBuchungDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(filter((buchung) => !!buchung))
      .subscribe({
        next: (buchung) => this.add.next(buchung),
      });
  }

  public authBuchungen() {
    let dialogRef = this.dialog.open(AuthBuchungenDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(
        filter((url) => !!url),
        switchMap((webId: string) => this.buchungenService.authBuchungen(webId))
      )
      .subscribe(console.log);
  }
}
