import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { from, Observable } from 'rxjs';
import { Buchung } from '../interfaces/Buchung.interface';
import { BuchungenService } from '../services/buchungen.service';
import { AddBuchungDialogComponent } from './add-buchung-dialog/add-buchung-dialog.component';

@Component({
  selector: 'app-buchungen',
  templateUrl: './buchungen.component.html',
  styleUrls: ['./buchungen.component.scss'],
})
export class BuchungenComponent {
  public buchungen: Observable<Buchung[]>;

  constructor(private buchungenService: BuchungenService, public dialog: MatDialog) {
    this.buchungen = from(this.buchungenService.getBuchungen());
  }

  public addBuchung() {
    let dialogRef = this.dialog.open(AddBuchungDialogComponent);
    dialogRef.afterClosed().subscribe(data => console.log(data));
  }
}
