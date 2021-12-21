import { Injectable } from '@angular/core';
import {
  addUrl,
  buildThing,
  createSolidDataset,
  createThing, getDate,
  getDecimal,
  getInteger,
  getSolidDataset, getStringNoLocale,
  getThing,
  getUrlAll,
  saveSolidDatasetAt, setThing,
  SolidDataset, ThingPersisted
} from '@inrupt/solid-client';
import { fetch } from '@inrupt/solid-client-authn-browser';
import { LDP, RDF } from '@inrupt/vocab-common-rdf';
import { buchungenPod, daco } from 'src/app/urls';
import { Buchung } from '../interfaces/Buchung.interface';

@Injectable({
  providedIn: 'root',
})
export class BuchungenService {

  public async getBuchungen(): Promise<Buchung[]> {
    let buchungenUrls: string[] = await getSolidDataset(buchungenPod, {fetch})
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
      buchungenUrls.map((url) => getSolidDataset(url, {fetch}))
    );
    const buchungNode = buchungPods.map((pod, index) =>
      getThing(pod, buchungenUrls[index])
    ).filter((buchung): buchung is NonNullable<ThingPersisted> =>  !!buchung);
    return buchungNode.map((node) => this.nodeToBuchung(node)).sort((a,b) => a.id - b.id);
  }

  public async addBuchung(buchung: Buchung) {
    let solidDataset = createSolidDataset();
    const localeBuchung = this.buchungToNode(buchung);
    solidDataset = setThing(solidDataset, localeBuchung);

    // let aclDataset = await getSolidDatasetWithAcl(buchungenPod, {fetch});
    // const accessByAgent = getAgentAccessAll(aclDataset);
    // console.log(accessByAgent);

    return saveSolidDatasetAt(`${buchungenPod}${buchung.id}`, solidDataset, {fetch});
  }

  public authBuchungen(webId: string): any {
    console.log(webId);
    throw new Error('Method not implemented.');
  }

  private buchungToNode(buchung:Buchung): ThingPersisted {
    let buchungThing = buildThing(createThing({url: `${buchungenPod}${buchung.id}`}))
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

  private nodeToBuchung(node: ThingPersisted): Buchung {
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
