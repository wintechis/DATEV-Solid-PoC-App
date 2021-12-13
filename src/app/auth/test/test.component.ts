import { Component, OnInit } from '@angular/core';
import { getDefaultSession, handleIncomingRedirect, login } from '@inrupt/solid-client-authn-browser';
import { map, tap } from 'rxjs';
import { AuthService } from '../auth.service';
import { OidcIssuers } from '../oidcIssuer.enum';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  public isLoggedIn$ = this.authService.sessionInfo.pipe(map(info => info.isLoggedIn));
  public oicdProviders = OidcIssuers;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public login(oidcProvider: string) {
    this.authService.login(oidcProvider);
  }

}
