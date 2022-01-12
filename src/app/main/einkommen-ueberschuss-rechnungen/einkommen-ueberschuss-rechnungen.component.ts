import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, filter, from, map, Observable, switchMap } from 'rxjs';
import { UserService } from 'src/app/auth/services/user.service';
import { Buchung } from '../interfaces/Buchung.interface';
import { EUeR } from '../interfaces/EUeR.interface';
import { EUeRService } from '../services/euer.service';
import { AddEuerDialogComponent } from './add-euer-dialog/add-euer-dialog.component';

@Component({
  selector: 'app-einkommen-ueberschuss-rechnungen',
  templateUrl: './einkommen-ueberschuss-rechnungen.component.html',
  styleUrls: ['./einkommen-ueberschuss-rechnungen.component.scss'],
})
export class EinkommenUeberschussRechnungenComponent {
  @Input()
  set buchungen(value: Buchung[]|null) {
    if (value) {
      this._buchungen = value;
    }
  }

  get buchungen() {
    return this._buchungen;
  }

  public euers: Observable<EUeR[]> | undefined;
  public hasAccess: boolean | undefined;
  public canCreate: Observable<boolean>;

  private _buchungen: Buchung[] = [];

  constructor(private euerService: EUeRService, public dialog: MatDialog, private userService: UserService) {
    this.euerService.hasAccess().then(isAuthorized => {
      if (isAuthorized) {
        this.hasAccess = true;
        this.euers = from(this.euerService.getEUeR());
      } else {
        this.hasAccess = false;
        this.euers = from([]);
      }
    })
    this.canCreate = combineLatest([
      this.userService.isAtEhrlich(),
      this.userService.isAtFraunhofer(),
    ]).pipe(map(([ehrlich, developer]) => ehrlich || developer));
  }

  public addEUeR() {
    const dialogRef = this.dialog.open(AddEuerDialogComponent, {
      data: {
        buchungen: this.buchungen,
      },
    });
    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      switchMap(euer => this.euerService.addEUeR(euer))
    ).subscribe({next: () => this.euers = from(this.euerService.getEUeR())});
  }
}
