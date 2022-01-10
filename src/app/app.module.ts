import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { NotLoggedInComponent } from './auth/not-logged-in/not-logged-in.component';
import { OidcDialogComponent } from './auth/oidc-dialog/oidc-dialog.component';
import { TestComponent } from './auth/test/test.component';
import { HeaderComponent } from './header/header.component';
import { UserInformationComponent } from './header/user-information/user-information.component';
import { AddBuchungDialogComponent } from './main/buchungen/add-buchung-dialog/add-buchung-dialog.component';
import { BuchungenTableComponent } from './main/buchungen/buchungen-table/buchungen-table.component';
import { BuchungenComponent } from './main/buchungen/buchungen.component';
import { CardComponent } from './main/card/card.component';
import { EinkommenUeberschussRechnungenComponent } from './main/einkommen-ueberschuss-rechnungen/einkommen-ueberschuss-rechnungen.component';
import { MainComponent } from './main/main.component';
import { WarnComponent } from './warn/warn.component';
import { AuthBuchungenDialogComponent } from './main/buchungen/auth-buchungen-dialog/auth-buchungen-dialog.component';
import { EuerTableComponent } from './main/einkommen-ueberschuss-rechnungen/euer-table/euer-table.component';
import { SumDirective } from './main/shared/sum.directive';
import { AddEuerDialogComponent } from './main/einkommen-ueberschuss-rechnungen/add-euer-dialog/add-euer-dialog.component';
import { AuthEuerDialogComponent } from './main/einkommen-ueberschuss-rechnungen/auth-euer-dialog/auth-euer-dialog.component';

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    HeaderComponent,
    AuthComponent,
    UserInformationComponent,
    OidcDialogComponent,
    NotLoggedInComponent,
    WarnComponent,
    MainComponent,
    BuchungenComponent,
    EinkommenUeberschussRechnungenComponent,
    CardComponent,
    BuchungenTableComponent,
    AddBuchungDialogComponent,
    AuthBuchungenDialogComponent,
    EuerTableComponent,
    SumDirective,
    AddEuerDialogComponent,
    AuthEuerDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTabsModule,
    MatTableModule,
    MatNativeDateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
