import { Component, OnInit } from '@angular/core';
import { getDefaultSession, handleIncomingRedirect } from '@inrupt/solid-client-authn-browser';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { OidcIssuers } from './oidcIssuer.enum';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public isLoggedIn:Observable<boolean> = this.authService.sessionInfo.pipe(map(info => info.isLoggedIn));

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public login() {
    this.authService.login(OidcIssuers[0].url);
  }

  public logout() {
    this.authService.logout();
  }


}
