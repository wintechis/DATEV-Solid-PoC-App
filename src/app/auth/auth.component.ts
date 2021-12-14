import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter, map, Observable } from 'rxjs';
import { OidcDialogComponent } from './oidc-dialog/oidc-dialog.component';
import { AuthService } from './services/auth.service';
import { OidcIssuers } from './shared/oidcIssuer.enum';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public isLoggedIn: Observable<boolean> = this.authService.sessionInfo.pipe(
    map((info) => info.isLoggedIn)
  );

  constructor(private authService: AuthService, public dialog: MatDialog) {}

  public openProviderDialog() {
    const dialogRef = this.dialog.open(OidcDialogComponent, {data: OidcIssuers});
    dialogRef.afterClosed().pipe(filter(provider => !!provider)).subscribe(provider => this.authService.login(provider))
  }

  public logout() {
    this.authService.logout();
  }
}
