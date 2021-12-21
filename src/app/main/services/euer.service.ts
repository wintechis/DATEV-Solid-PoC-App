import { Injectable } from '@angular/core';
import {
  getContainedResourceUrlAll,
  getDate,
  getDecimal,
  getLiteral,
  getSolidDataset,
  getStringNoLocale,
  getThing,
  getUrl,
  SolidDataset,
  ThingPersisted,
} from '@inrupt/solid-client';
import { fetch } from '@inrupt/solid-client-authn-browser';
import { daco, euerPod, rov } from 'src/app/urls';
import { EUeR } from '../interfaces/EUeR.interface';

@Injectable({
  providedIn: 'root',
})
export class EUeRService {

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
    )

    return euers.sort((a, b) => a.timeframe.getTime() - b.timeframe.getTime());
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
    };
  }
}
