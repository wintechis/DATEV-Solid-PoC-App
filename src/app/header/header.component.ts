import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public webId: Observable<string> = this.authService.sessionInfo.pipe(map(info =>  info.webId || "" ));
  public isLoggedIn = this.authService.sessionInfo.pipe(map(info => info.isLoggedIn));

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
