import { Component } from '@angular/core';
import { from, Observable } from 'rxjs';
import { EUeR } from '../interfaces/EUeR.interface';
import { EUeRService } from '../services/euer.service';

@Component({
  selector: 'app-einkommen-ueberschuss-rechnungen',
  templateUrl: './einkommen-ueberschuss-rechnungen.component.html',
  styleUrls: ['./einkommen-ueberschuss-rechnungen.component.scss']
})
export class EinkommenUeberschussRechnungenComponent  {

  public euers: Observable<EUeR[]>;

  constructor(private euerService: EUeRService) {
    this.euers = from(this.euerService.getEUeR());
  }


}
