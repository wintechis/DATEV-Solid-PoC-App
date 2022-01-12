import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Freigabe } from './freigaben-table/freigaben-table.component';

@Component({
  selector: 'app-freigaben',
  templateUrl: './freigaben.component.html',
  styleUrls: ['./freigaben.component.scss']
})
export class FreigabenComponent implements OnInit {

  @Input()
  public buchungsFreigaben: Record<string, string[]> | undefined | null;

  @Input()
  public euerFreigaben: Record<string, string[]> | undefined | null;

  @Output()
  public removeBuchung = new EventEmitter<Freigabe>();

  @Output()
  public removeEuer = new EventEmitter<Freigabe>();

  constructor() {

   }

  ngOnInit(): void {
  }

  public removeBuchungsFreigabe(freigabe: Freigabe) {
    this.removeBuchung.emit(freigabe);
  }

  public removeEuerFreigabe(freigabe: Freigabe) {
    this.removeEuer.emit(freigabe);
  }

}


