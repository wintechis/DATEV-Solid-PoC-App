import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  getDefaultSession,
  handleIncomingRedirect,
  ISessionInfo,
  login,
  logout,
} from '@inrupt/solid-client-authn-browser';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private session$ = new BehaviorSubject<ISessionInfo>(
    getDefaultSession().info
  );
  constructor(private router: Router) {}

  public ngOnDestroy(): void {
    this.session$.complete();
  }

  get sessionInfo(): Observable<ISessionInfo> {
    return this.session$.asObservable();
  }

  get isLoggedIn(): Observable<boolean> {
    return this.sessionInfo.pipe(
      map((info) => info.isLoggedIn),
      tap(console.log)
    );
  }

  public async login(oidcProvider: string) {
    console.log(window.location.href);
    await login({
      oidcIssuer: oidcProvider,
      redirectUrl: window.location.href,
      clientName: 'DATEV Solid PoC',
    });
  }

  public handleIncomingLogin() {
    handleIncomingRedirect()
      .then(() => console.log('service'))
      .then(() => getDefaultSession())
      .then((session) => this.session$.next(session.info))
      .then(() => this.router.navigate(['']));
  }

  public async logout() {
    await logout();
    await this.updateSessionInfo();
    this.router.navigate(['login']);
  }

  private async updateSessionInfo() {
    await handleIncomingRedirect();

    const session = getDefaultSession();
    console.log(session);
    this.session$.next(session.info);
  }
}
