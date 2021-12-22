import { Component } from '@angular/core';
import { Buchung } from './interfaces/Buchung.interface';
import { BuchungenService } from './services/buchungen.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  public buchungen = this.buchungenService.getBuchungen();

  constructor(private buchungenService: BuchungenService) { }

  addBuchung(buchung: Buchung) {
    this.buchungenService.addBuchung(buchung).then(
      () => this.buchungen = this.buchungenService.getBuchungen()
    );
  }
}
