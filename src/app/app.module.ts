import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { TestComponent } from './auth/test/test.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';

import {MatIconModule} from '@angular/material/icon';
import { UserInformationComponent } from './header/user-information/user-information.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HeaderComponent,
    AuthComponent,
    UserInformationComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
