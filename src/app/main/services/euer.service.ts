import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  buildThing,
  createAclFromFallbackAcl,
  createSolidDataset,
  createThing,
  getContainedResourceUrlAll,
  getDate,
  getDecimal,
  getLiteral,
  getResourceAcl,
  getSolidDataset,
  getSolidDatasetWithAcl,
  getStringNoLocale,
  getThing,
  getUrl,
  hasAccessibleAcl,
  hasFallbackAcl,
  hasResourceAcl,
  saveAclFor,
  saveSolidDatasetAt,
  setAgentResourceAccess,
  setPublicResourceAccess,
  setThing,
  SolidDataset,
  ThingPersisted,
} from '@inrupt/solid-client';
import { fetch } from '@inrupt/solid-client-authn-browser';
import { RDF } from '@inrupt/vocab-common-rdf';
import { daco, euerPod, rov } from 'src/app/urls';
import { EUeR } from '../interfaces/EUeR.interface';
import { getWebIdsWithReadAccess } from './getWebIdsWithReadAccess';

@Injectable({
  providedIn: 'root',
})
export class EUeRService {

  public async hasAccess() {
    return getSolidDataset(euerPod, { fetch })
      .then((_) => true)
      .catch((_) => false);
  }

  public async getAcl(): Promise<Record<string, string[]>> {
    const urls: string[] = await getSolidDataset(euerPod, { fetch }).then(
      (dataset) => getContainedResourceUrlAll(dataset)
    );

    let record: Record<string, string[]> = {};
    for (let url of urls) {
      record[url] = await getWebIdsWithReadAccess(url);
    }
    return record;
  }

  async authEuer(webId: string, resourceUrl: string): Promise<any> {
    let aclDataset = await getSolidDatasetWithAcl(resourceUrl, { fetch });
    let resourceAcl;
    if (!hasResourceAcl(aclDataset)) {
      if (!hasAccessibleAcl(aclDataset)) {
        throw new Error(
          'The current user does not have permission to change access rights to this Resource.'
        );
      }
      if (!hasFallbackAcl(aclDataset)) {
        throw new Error(
          'The current user does not have permission to see who currently has access to this Resource.'
        );
        // Alternatively, initialise a new empty ACL as follows,
        // but be aware that if you do not give someone Control access,
        // **nobody will ever be able to change Access permissions in the future**:
        // resourceAcl = createAcl(myDatasetWithAcl);
      }
      resourceAcl = createAclFromFallbackAcl(aclDataset);
    } else {
      resourceAcl = getResourceAcl(aclDataset);
    }

    // Give someone Control access to the given Resource:
    const updatedAcl = setAgentResourceAccess(resourceAcl, webId, {
      read: true,
      append: false,
      write: false,
      control: false,
    });

    // Now save the ACL:
    await saveAclFor(aclDataset, updatedAcl, { fetch });
  }

  public async getEUeR(): Promise<EUeR[]> {
    const urls: string[] = await getSolidDataset(euerPod, { fetch }).then(
      (dataset) => getContainedResourceUrlAll(dataset)
    );

    const euerDatasets: SolidDataset[] = await Promise.all(
      urls.map((url) => getSolidDataset(url, { fetch }))
    );

    const eurNodes = euerDatasets
      .map((pod, index) => getThing(pod, urls[index]))
      .filter((euer): euer is NonNullable<ThingPersisted> => !!euer);
    console.log(eurNodes);

    const euers = await Promise.all(
      eurNodes.map((node) => this.nodeToEuer(node))
    );

    return euers.sort((a, b) => a.timeframe.getTime() - b.timeframe.getTime());
  }

  public addEUeR(euer: EUeR) {
    let solidDataset = createSolidDataset();
    const localeEUeR = this.euerToNode(euer);
    solidDataset = setThing(solidDataset, localeEUeR);

    return saveSolidDatasetAt(euer.resourceUrl, solidDataset, { fetch });
  }

  async getLegalName(url: string) {
    const dataset = await getSolidDataset(url, { fetch });
    const node = getThing(dataset, url);
    return node ? getStringNoLocale(node, `${rov}legalName`) || '' : '';
  }

  async nodeToEuer(node: ThingPersisted): Promise<EUeR> {
    const businessUrl = getUrl(node, `${daco}business`);
    const businessName = businessUrl
      ? await this.getLegalName(businessUrl)
      : '';
    const taxAccountantUrl = getUrl(node, `${daco}taxAccountant`);
    const taxAccountantName = taxAccountantUrl
      ? await this.getLegalName(taxAccountantUrl)
      : '';
    const time = getLiteral(node, `${daco}timeframe`);
    const timeframe = time ? new Date(Date.parse(time.value)) : new Date();
    return {
      business: businessName,
      taxAccountant: taxAccountantName,
      timeframe: timeframe,
      issueDate: getDate(node, `${daco}issuedate`) || new Date(),
      sumOfIncome: getDecimal(node, `${daco}sumOfIncome`) || 0,
      sumOfExpense: getDecimal(node, `${daco}sumOfExpense`) || 0,
      result: getDecimal(node, `${daco}result`) || 0,
      resourceUrl: node.url,
    };
  }

  euerToNode(euer: EUeR): ThingPersisted {
    let euerThing = buildThing(createThing({ url: euer.resourceUrl }))
      .addUrl(`${daco}business`, euer.business)
      .addUrl(`${daco}taxAccountant`, euer.taxAccountant)
      .addDate(`${daco}issueDate`, euer.issueDate)
      .addDecimal(`${daco}sumOfIncome`, euer.sumOfIncome)
      .addDecimal(`${daco}sumOfExpense`, euer.sumOfExpense)
      .addDecimal(`${daco}result`, euer.result)
      .addUrl(RDF.type, `${daco}EUeR`)
      .addLiteral(`${daco}timeframe`, {
        termType: 'Literal',
        datatype: {
          value: 'http://www.w3.org/2001/XMLSchema#gYearMonth',
          equals: () => false,
          termType: 'NamedNode',
        },
        value: formatDate(euer.timeframe, 'yyyy-MM', 'de'),
        language: '',
        equals: () => false,
      })
      .build();

    return euerThing;
  }
}
