import { Injectable } from '@angular/core';
import {
  getDate,
  getInteger,
  getSolidDataset,
  getStringNoLocale,
  getThing,
  getUrlAll,
  SolidDataset,
  ThingPersisted,
} from '@inrupt/solid-client';
import { LDP, RDF } from '@inrupt/vocab-common-rdf';
import { buchungenPod, daco } from 'src/app/urls';
import { Buchung } from '../interfaces/Buchung.interface';

@Injectable({
  providedIn: 'root',
})
export class BuchungenService {

  constructor() {}

  public async getBuchungen(): Promise<Buchung[]> {
    let buchungenUrls: string[] = await getSolidDataset(buchungenPod)
      .then((buchungenContainer) =>
        getThing(buchungenContainer, buchungenPod)
      )
      .then(buchungen => {
        if (!buchungen) {
          throw new Error(
            `Couldn't find ${buchungenPod} in its corresponding Pod`
          );
        } else {
          return getUrlAll(buchungen, LDP.contains);
        }
      });


    const buchungPods: SolidDataset[] = await Promise.all(
      buchungenUrls.map((url) => getSolidDataset(url))
    );
    const buchungNode = buchungPods.map((pod, index) =>
      getThing(pod, buchungenUrls[index])
    );
    const buchungen = buchungNode.map((node) => this.nodeToBuchung(node));
    return buchungen;
  }

  private nodeToBuchung(node: ThingPersisted | null): Buchung {
    if (!node) {
      throw Error('Add logging above');
    }

    return {
      id: getInteger(node, `${daco}number`) || -1,
      amount: getInteger(node, `${daco}figure`) || 0,
      date: getDate(node, `${daco}date`) || new Date(),
      description: getStringNoLocale(node, `${daco}item`) || "",
      type: getUrlAll(node, RDF.type).includes(`${daco}Income`)? "Einnahme" : "Ausgabe"

    }
  }
}
