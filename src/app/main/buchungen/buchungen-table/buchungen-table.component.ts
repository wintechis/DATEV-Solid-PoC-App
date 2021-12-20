import { Component, Input } from '@angular/core';
import { Buchung } from '../../interfaces/Buchung.interface';

@Component({
  selector: 'app-buchungen-table',
  templateUrl: './buchungen-table.component.html',
  styleUrls: ['./buchungen-table.component.scss'],
})
export class BuchungenTableComponent {
  @Input()
  buchungen: Buchung[] = [];

  displayedColumns: string[] = ['id', 'date', 'description', 'type', 'amount'];
}
