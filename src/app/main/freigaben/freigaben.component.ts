import { Component, OnInit } from '@angular/core';
import { BuchungenService } from '../services/buchungen.service';
import { EUeRService } from '../services/euer.service';

@Component({
  selector: 'app-freigaben',
  templateUrl: './freigaben.component.html',
  styleUrls: ['./freigaben.component.scss']
})
export class FreigabenComponent implements OnInit {

  constructor(private buchungenService:BuchungenService, private euerService: EUeRService) {
    this.buchungenService.getAcl().then(console.log);
    this.euerService.getAcl().then(console.log);
   }

  ngOnInit(): void {
  }

}
