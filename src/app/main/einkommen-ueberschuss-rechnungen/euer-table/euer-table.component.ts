import { Component, Input, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';
import { EUeR } from '../../interfaces/EUeR.interface';
import { EUeRService } from '../../services/euer.service';
import { AuthEuerDialogComponent } from '../auth-euer-dialog/auth-euer-dialog.component';

@Component({
  selector: 'app-euer-table',
  templateUrl: './euer-table.component.html',
  styleUrls: ['./euer-table.component.scss'],
})
export class EuerTableComponent {
  @Input()
  euers: EUeR[] = [];


  displayedColumns = [
    'business',
    'issueDate',
    'timeframe',
    'sumOfIncome',
    'sumOfExpense',
    'result',
    'action',
  ];

  constructor(private euerService: EUeRService, private dialog: MatDialog) {}

  public auth(element: EUeR) {
    let dialogRef = this.dialog.open(AuthEuerDialogComponent, {data: element});
    dialogRef
      .afterClosed()
      .pipe(
        filter((url) => !!url),
        switchMap((webId: string) => this.euerService.authEuer(webId, element.resourceUrl))
      )
      .subscribe(console.log);
  }
}
