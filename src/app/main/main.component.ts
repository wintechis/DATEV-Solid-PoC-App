import { Component } from '@angular/core';
import { Buchung } from './interfaces/Buchung.interface';
import { BuchungenService } from './services/buchungen.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  // public buchungen = this.buchungenService.getBuchungen();
  public buchungen: Promise<Buchung[]> | undefined;
  public isAuthorized = false;

  constructor(private buchungenService: BuchungenService) {
    this.buchungenService.hasAccess().then(
      auth => {
        if (auth) {
          this.buchungen = this.buchungenService.getBuchungen();
          this.isAuthorized = true;
        } else {
          this.isAuthorized = false;
        }
      }
    )
   }

  addBuchung(buchung: Buchung) {
    this.buchungenService.addBuchung(buchung).then(
      () => this.buchungen = this.buchungenService.getBuchungen()
    );
  }
}
