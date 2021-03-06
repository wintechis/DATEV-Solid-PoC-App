import { Injectable } from '@angular/core';
import {
  getSolidDataset,
  getStringNoLocale,
  getThing,
  SolidDataset,
  ThingPersisted,
  WithServerResourceInfo,
} from '@inrupt/solid-client';
import { fetch } from '@inrupt/solid-client-authn-browser';
import { VCARD } from '@inrupt/vocab-common-rdf';
import {
  filter,
  map,
  Observable,
  share,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userDataset$ = new Observable<
    SolidDataset & WithServerResourceInfo
  >();

  constructor(private authService: AuthService) {
    this.userDataset$ = authService.sessionInfo.pipe(
      filter((userInfo) => userInfo.isLoggedIn && !!userInfo.webId),
      switchMap((userInfo) =>
        getSolidDataset(userInfo.webId as string, { fetch })
      )
    );
  }

  public userCard(): Observable<ThingPersisted | null> {
    return this.userDataset$.pipe(
      withLatestFrom(this.authService.sessionInfo),
      map(([dataset, sessionInfo]) =>
        getThing(dataset, sessionInfo.webId as string)
      ),
      share()
    );
  }

  public isAtNordwind(): Observable<boolean> {
    return this.worksAtCompany('nordwind');
  }

  public isAtFraunhofer(): Observable<boolean> {
    return this.worksAtCompany('fraunhofer');
  }

  public isAtEhrlich(): Observable<boolean> {
    return this.worksAtCompany('ehrlich');
  }

  public isAtGruenbank(): Observable<boolean> {
    return this.worksAtCompany('grünbank');
  }

  private worksAtCompany(companyName: string) {
    const checkComponanyString = companyName.toLowerCase();
    return this.userCard().pipe(
      filter((card): card is NonNullable<ThingPersisted> => !!card),
      map((card) => getStringNoLocale(card, VCARD.organization_name)),
      map(
        (orgName) =>
          orgName?.toLowerCase().includes(checkComponanyString) || false
      )
    );
  }
}
