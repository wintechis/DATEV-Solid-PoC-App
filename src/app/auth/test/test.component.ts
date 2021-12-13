import { Component } from '@angular/core';
import { map } from 'rxjs';
import { AuthService } from '../auth.service';
import { OidcIssuers } from '../oidcIssuer.enum';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  public isLoggedIn$ = this.authService.sessionInfo.pipe(
    map((info) => info.isLoggedIn)
  );
  public oicdProviders = OidcIssuers;

  constructor(private authService: AuthService) {}

  public login(oidcProvider: string) {
    this.authService.login(oidcProvider);
  }
}
