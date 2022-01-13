import { Component } from '@angular/core';
import { Freigabe } from './freigaben/freigaben-table/freigaben-table.component';
import { Buchung } from './interfaces/Buchung.interface';
import { BuchungenService } from './services/buchungen.service';
import { EUeRService } from './services/euer.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  // public buchungen = this.buchungenService.getBuchungen();
  public buchungen: Promise<Buchung[]> | undefined;
  public isAuthorized = false;

  public buchungsFreigaben;
  public euerFreigaben;

  constructor(
    private buchungenService: BuchungenService,
    private euerService: EUeRService
  ) {
    this.buchungenService.hasAccess().then((auth) => {
      if (auth) {
        this.buchungen = this.buchungenService.getBuchungen();
        this.isAuthorized = true;
      } else {
        this.isAuthorized = false;
      }
    });

    this.buchungsFreigaben = buchungenService.getAcl();
    this.euerFreigaben = this.euerService.getAcl();
  }

  addBuchung(buchung: Buchung) {
    this.buchungenService
      .addBuchung(buchung)
      .then(() => (this.buchungen = this.buchungenService.getBuchungen()));
  }

  deleteBuchungsFreigabe(freigabe: Freigabe) {
    this.buchungenService
      .removeAuth(freigabe.webId)
      .then(() => this.setBuchungsFreigaben());
  }

  deleteEuerFreigabe(freigabe: Freigabe) {
    this.euerService
      .removeAuth(freigabe.url, freigabe.webId)
      .then(() => this.setEuerFreigaben());
  }

  setBuchungsFreigaben() {
    this.buchungsFreigaben = this.buchungenService.getAcl();
  }

  setEuerFreigaben() {
    this.euerFreigaben = this.euerService.getAcl();
  }
}
