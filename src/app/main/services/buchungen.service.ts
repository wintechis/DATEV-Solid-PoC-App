import { Injectable } from '@angular/core';
import {
  addUrl,
  buildThing,
  createAclFromFallbackAcl,
  createSolidDataset,
  createThing,
  getDate,
  getDecimal,
  getInteger,
  getResourceAcl,
  getSolidDataset,
  getSolidDatasetWithAcl,
  getStringNoLocale,
  getThing,
  getUrlAll,
  hasAccessibleAcl,
  hasFallbackAcl,
  hasResourceAcl,
  saveAclFor,
  saveSolidDatasetAt,
  setAgentResourceAccess,
  setThing,
  SolidDataset,
  ThingPersisted,
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
    let buchungenUrls: string[] = await getSolidDataset(buchungenPod, { fetch })
      .then((buchungenContainer) => getThing(buchungenContainer, buchungenPod))
      .then((buchungen) => {
        if (!buchungen) {
          throw new Error(
            `Couldn't find ${buchungenPod} in its corresponding Pod`
          );
        } else {
          return getUrlAll(buchungen, LDP.contains);
        }
      });

    const buchungPods: SolidDataset[] = await Promise.all(
      buchungenUrls.map((url) => getSolidDataset(url, { fetch }))
    );
    const buchungNode = buchungPods
      .map((pod, index) => getThing(pod, buchungenUrls[index]))
      .filter((buchung): buchung is NonNullable<ThingPersisted> => !!buchung);
    return buchungNode
      .map((node) => this.nodeToBuchung(node))
      .sort((a, b) => a.id - b.id);
  }

  public async addBuchung(buchung: Buchung) {
    let solidDataset = createSolidDataset();
    const localeBuchung = this.buchungToNode(buchung);
    solidDataset = setThing(solidDataset, localeBuchung);

    return saveSolidDatasetAt(`${buchungenPod}${buchung.id}`, solidDataset, {
      fetch,
    });
  }

  public async authBuchungen(webId: string): Promise<any> {
    const myDatasetWithAcl = await getSolidDatasetWithAcl(
      buchungenPod, {fetch}
    );

    // Obtain the SolidDataset's own ACL, if available,
    // or initialise a new one, if possible:
    let resourceAcl;
    if (!hasResourceAcl(myDatasetWithAcl)) {
      if (!hasAccessibleAcl(myDatasetWithAcl)) {
        throw new Error(
          'The current user does not have permission to change access rights to this Resource.'
        );
      }
      if (!hasFallbackAcl(myDatasetWithAcl)) {
        throw new Error(
          'The current user does not have permission to see who currently has access to this Resource.'
        );
        // Alternatively, initialise a new empty ACL as follows,
        // but be aware that if you do not give someone Control access,
        // **nobody will ever be able to change Access permissions in the future**:
        // resourceAcl = createAcl(myDatasetWithAcl);
      }
      resourceAcl = createAclFromFallbackAcl(myDatasetWithAcl);
    } else {
      resourceAcl = getResourceAcl(myDatasetWithAcl);
    }

    // Give someone Control access to the given Resource:
    const updatedAcl = setAgentResourceAccess(
      resourceAcl,
      webId,
      { read: true, append: false, write: false, control: false }
    );

    // Now save the ACL:
    await saveAclFor(myDatasetWithAcl, updatedAcl, {fetch});
  }

  private buchungToNode(buchung: Buchung): ThingPersisted {
    let buchungThing = buildThing(
      createThing({ url: `${buchungenPod}${buchung.id}` })
    )
      .addInteger(`${daco}number`, buchung.id)
      .addDecimal(`${daco}figure`, buchung.amount)
      .addDate(`${daco}date`, buchung.date)
      .addStringNoLocale(`${daco}item`, buchung.description)
      .addUrl(RDF.type, `${daco}AccountingTransaction`)
      .build();

    const type =
      buchung.type === 'Ausgabe' ? `${daco}Expense` : `${daco}Income`;
    buchungThing = addUrl(buchungThing, RDF.type, type);

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
      description: getStringNoLocale(node, `${daco}item`) || '',
      type: getUrlAll(node, RDF.type).includes(`${daco}Income`)
        ? 'Einnahme'
        : 'Ausgabe',
    };
  }
}
