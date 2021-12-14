import { Injectable } from '@angular/core';
import { getSolidDataset, getThing, SolidDataset, ThingPersisted, WithServerResourceInfo } from '@inrupt/solid-client';
import { filter, map, Observable, share, switchMap, withLatestFrom } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userDataset$ = new  Observable<SolidDataset & WithServerResourceInfo>();

  constructor(private authService: AuthService) {
    this.userDataset$ = authService.sessionInfo.pipe(
      filter(userInfo => userInfo.isLoggedIn && !!userInfo.webId),
      switchMap(userInfo => getSolidDataset(userInfo.webId as string)),
    );
  }

  get userCard(): Observable<ThingPersisted|null> {
    return this.userDataset$.pipe(
      withLatestFrom(this.authService.sessionInfo),
      map(([dataset, sessionInfo]) => getThing(dataset, sessionInfo.webId as string)),
      share()
    );
  }
}
