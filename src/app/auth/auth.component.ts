import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { OidcIssuers } from './oidcIssuer.enum';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public isLoggedIn: Observable<boolean> = this.authService.sessionInfo.pipe(
    map((info) => info.isLoggedIn)
  );

  constructor(private authService: AuthService) {}

  public login() {
    this.authService.login(OidcIssuers[0].url);
  }

  public logout() {
    this.authService.logout();
  }
}
