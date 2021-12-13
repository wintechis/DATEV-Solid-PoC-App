import { Injectable, OnDestroy } from '@angular/core';
import { getDefaultSession, handleIncomingRedirect, ISessionInfo, login, logout } from '@inrupt/solid-client-authn-browser';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private session$ = new BehaviorSubject<ISessionInfo>(getDefaultSession().info);
  constructor() {
    handleIncomingRedirect().then(() => getDefaultSession()).then(session => this.session$.next(session.info));
   }

   public ngOnDestroy(): void {
     this.session$.complete();
   }

  get sessionInfo():Observable<ISessionInfo> {
    return this.session$.asObservable();
  }

  public async login(oidcProvider: string) {
    await login({
      oidcIssuer: oidcProvider,
      redirectUrl: window.location.href,
      clientName: "DATEV Solid PoC"
    });

    return this.updateSessionInfo();
  }

  public async logout() {
    await logout();
    this.updateSessionInfo();
  }

  private async updateSessionInfo() {
    await handleIncomingRedirect();

    const session = getDefaultSession();
    console.log(session);
    this.session$.next(session.info);
  }


}
