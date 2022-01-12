import { Component } from '@angular/core';
import { getStringNoLocale, getUrl } from '@inrupt/solid-client';
import { VCARD } from '@inrupt/vocab-common-rdf';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss'],
})
export class UserInformationComponent {
  public webId: Observable<string> = this.authService.sessionInfo.pipe(
    map((info) => info.webId || '')
  );
  public isLoggedIn: Observable<boolean> = this.authService.isLoggedIn;

  public userCard: Observable<{
    name?: string | null;
    organization?: string | null;
    photo?: string | null;
  }> = this.userService.userCard().pipe(
    map((card) => {
      if (!card) {
        return {};
      }
      return {
        name: getStringNoLocale(card, VCARD.fn),
        organization: getStringNoLocale(card, VCARD.organization_name),
        photo: getUrl(card, VCARD.hasPhoto),
      };
    })
  );

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

}
