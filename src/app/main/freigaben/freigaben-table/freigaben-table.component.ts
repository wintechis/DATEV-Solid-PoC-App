import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Freigabe {
  url: string,
  webId: string
}

@Component({
  selector: 'app-freigaben-table',
  templateUrl: './freigaben-table.component.html',
  styleUrls: ['./freigaben-table.component.scss']
})
export class FreigabenTableComponent {

  public freigaben: Freigabe[] = [];

  @Input()
  set data(value: Record<string, string[]>) {
    console.log(value);
    let freigaben = [];
    for (let key of Object.keys(value)) {
      for (let id of value[key]) {
        freigaben.push({url: key, webId: id});
      }
    }
    this.freigaben = freigaben;
  }

  @Output()
  deleteFreigabe = new EventEmitter<Freigabe>();

  displayedColumns: string[] = ['url', 'webId', 'action'];

  public remove(freigabe: Freigabe) {
    this.deleteFreigabe.emit(freigabe);
  }

}
