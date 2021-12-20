import { Component, OnInit } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Buchung } from '../interfaces/Buchung.interface';
import { BuchungenService } from '../services/buchungen.service';

@Component({
  selector: 'app-buchungen',
  templateUrl: './buchungen.component.html',
  styleUrls: ['./buchungen.component.scss']
})
export class BuchungenComponent implements OnInit {

  public buchungen: Observable<Buchung[]>;

  constructor(private buchungenService: BuchungenService) {
    this.buchungen = from(this.buchungenService.getBuchungen());
   }

  ngOnInit(): void {

  }

}
