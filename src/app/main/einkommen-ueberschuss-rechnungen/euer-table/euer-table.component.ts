import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, switchMap } from 'rxjs';
import { EUeR } from '../../interfaces/EUeR.interface';
import { EUeRService } from '../../services/euer.service';
import { AuthEuerDialogComponent } from '../auth-euer-dialog/auth-euer-dialog.component';

@Component({
  selector: 'app-euer-table',
  templateUrl: './euer-table.component.html',
  styleUrls: ['./euer-table.component.scss'],
})
export class EuerTableComponent implements OnInit{
  @Input()
  euers: EUeR[] = [];

  @Output()
  updateAuth = new EventEmitter<void>();

  displayedColumns = [
    'business',
    'issueDate',
    'timeframe',
    'sumOfIncome',
    'sumOfExpense',
    'result',
    'action',
    'link'
  ];

  constructor(private euerService: EUeRService, private dialog: MatDialog) {

  }

  async ngOnInit() {
    for (let euer of this.euers) {
      this.hasControl.set(euer.resourceUrl, await this.euerService.hasControlOfEuer(euer.resourceUrl));
    }

  }

  public hasControl: Map<string, boolean> = new Map();

  public auth(element: EUeR) {
    let dialogRef = this.dialog.open(AuthEuerDialogComponent, {data: element});
    dialogRef
      .afterClosed()
      .pipe(
        filter((url) => !!url),
        switchMap((webId: string) => this.euerService.authEuer(webId, element.resourceUrl))
      )
      .subscribe({
        next: () => this.updateAuth.emit()
      });
  }

  goToLink(url: string) {
    window.open(url, "_blank");
  }

  // public async hasControl(url: string): Promise<boolean> {
  //   return true;
  //   // return this.euerService.hasControlOfEuer(url).then(res => {console.log(res); return res;});
  // }
}
