import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, filter, from, map, Observable, switchMap, tap } from 'rxjs';
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
  public buchungen: Observable<Buchung[]>;
  public hasButtons: Observable<boolean>;

  constructor(
    private buchungenService: BuchungenService,
    private userService: UserService,
    public dialog: MatDialog
  ) {
    this.buchungen = from(this.buchungenService.getBuchungen());
    this.hasButtons = combineLatest([
      this.userService.isAtNordwind,
      this.userService.isAtFraunhofer,
    ]).pipe(
      map(([nordwind, developer]) => nordwind || developer)
    );
  }

  public addBuchung() {
    let dialogRef = this.dialog.open(AddBuchungDialogComponent);
    dialogRef
      .afterClosed()
      .pipe(switchMap((buchung) => this.buchungenService.addBuchung(buchung)))
      .subscribe(console.log);
  }

  public authBuchungen() {
    let dialogRef = this.dialog.open(AuthBuchungenDialogComponent);
    dialogRef
    .afterClosed()
    .pipe(
      filter(url => !!url),
      switchMap((webId:string) => this.buchungenService.authBuchungen(webId))
    )
    .subscribe(console.log);
  }
}
