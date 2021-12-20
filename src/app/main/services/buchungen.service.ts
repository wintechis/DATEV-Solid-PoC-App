import { Injectable } from '@angular/core';
import {
  addUrl,
  buildThing,
  createSolidDataset,
  createThing,
  getDate,
  getDecimal,
  getInteger,
  getSolidDataset,
  getStringNoLocale,
  getThing,
  getUrlAll,
  saveSolidDatasetAt,
  saveSolidDatasetInContainer,
  setThing,
  SolidDataset,
  ThingLocal,
  ThingPersisted,
} from '@inrupt/solid-client';
import { LDP, RDF } from '@inrupt/vocab-common-rdf';
import { buchungenPod, daco } from 'src/app/urls';
import { Buchung } from '../interfaces/Buchung.interface';

@Injectable({
  providedIn: 'root',
})
export class BuchungenService {

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
    return buchungNode.map((node) => this.nodeToBuchung(node)).sort((a,b) => a.id - b.id);
  }

  public addBuchung(buchung: Buchung) {
    let solidDataset = createSolidDataset();
    const localeBuchung = this.buchungToNode(buchung);
    solidDataset = setThing(solidDataset, localeBuchung);

    return saveSolidDatasetAt(`${buchungenPod}${buchung.id}`, solidDataset);
  }

  private buchungToNode(buchung:Buchung): ThingLocal {
    let buchungThing = buildThing(createThing({ name: `${buchung.id}` }))
    .addInteger( `${daco}number`, buchung.id)
    .addDecimal(`${daco}figure`, buchung.amount)
    .addDate(`${daco}date`, buchung.date)
    .addStringNoLocale(`${daco}item`, buchung.description)
    .addUrl(RDF.type, `${daco}AccountingTransaction`)
    .build();

    const type = buchung.type === "Ausgabe" ? `${daco}Expense` : `${daco}Income`;
    buchungThing = addUrl(buchungThing, RDF.type, type)

    console.log(buchungThing);

    return buchungThing;

  }

  private nodeToBuchung(node: ThingPersisted | null): Buchung {
    if (!node) {
      throw Error('Add logging above');
    }

    return {
      id: getInteger(node, `${daco}number`) || -1,
      amount: getDecimal(node, `${daco}figure`) || 0,
      date: getDate(node, `${daco}date`) || new Date(),
      description: getStringNoLocale(node, `${daco}item`) || "",
      type: getUrlAll(node, RDF.type).includes(`${daco}Income`)? "Einnahme" : "Ausgabe"

    }
  }
}
