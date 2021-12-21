import { Component, Input } from '@angular/core';
import { EUeR } from '../../interfaces/EUeR.interface';
import { EUeRService } from '../../services/euer.service';

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

  constructor(private euerService: EUeRService) {}

  public auth(element: EUeR) {
    console.log(element);
  }
}
