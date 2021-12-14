import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { TestComponent } from './auth/test/test.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';

import {MatDialogModule} from '@angular/material/dialog'
import {MatIconModule} from '@angular/material/icon';
import { UserInformationComponent } from './header/user-information/user-information.component';
import { HttpClientModule } from '@angular/common/http';
import { OidcDialogComponent } from './auth/oidc-dialog/oidc-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HeaderComponent,
    AuthComponent,
    UserInformationComponent,
    OidcDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
