import { Component } from '@angular/core';
import { combineLatest, map, Observable, of } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { UserService } from '../auth/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public webId: Observable<string> = this.authService.sessionInfo.pipe(
    map((info) => info.webId || '')
  );
  public isLoggedIn = this.authService.sessionInfo.pipe(
    map((info) => info.isLoggedIn)
  );

  public isEhrlich = of(false);
  public isGruenbank = of(false);
  public isNordwind = of(false);
  public light = of(false);

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.isEhrlich = userService.isAtEhrlich();
    this.isGruenbank = userService.isAtGruenbank();
    this.isNordwind = userService.isAtNordwind();
    this.light = combineLatest([
      userService.isAtNordwind(),
      userService.isAtGruenbank(),
    ]).pipe(map(([nordwind, gruenbank]) => nordwind || gruenbank));
  }
}
