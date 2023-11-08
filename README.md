# SolidDATEV

## General

The goal of the proof of concept is to show how Solid pods could be used to share data between companies in a tangible scenario. The chosen use case is a oversimplified scenario in which a company requests a loan from a banking establishment. In order to grant this credit the bank needs verified information about the financial situation of the customer from his tax accountant.

## Features

In this app an user interface is provided that enables:
- login/logout via Solid OIDC
- for the customer company "Nordwind":
  - an overview of their income and expenses under "Buchungen"
  - to share all their incomes and expenses ("Buchungen") with a WebID of their choice (in this scenario the intended WebID would represent the tax accountant)
  - to add new accounting data 
  - to remove given access rights from their Solid pod
- for the tax accountant "Dr. Ehrlich"
  - an overview of the shared accounting data from the company "Nordwind"
  - to add new revenue surplus statements (EÜR) for specific months
  - to share specific revenue surplus statements with a WebID  of their choice (in this scenario the intended WebID would represent the bank)
  - to remove given access rights from their Solid pod
- for the bank "Grünbank":
  - to view the shared revenue surplus statements

## Restrictions

- URIs for Solid pods are hardcoded in [app/urls.ts](https://github.com/wintechis/DATEV-Solid-PoC-App/blob/master/src/app/urls.ts)
- company affiliation is currently done via the organization name (https://www.w3.org/2006/vcard/ns#organization-name) in the profile cards of the WebIDs. (See [UserService](https://github.com/wintechis/DATEV-Solid-PoC-App/blob/master/src/app/auth/services/user.service.ts).) This should be rectified in further research projects.
- GroupIDs are assumed as provided WebIDs for Access Rights since we wanted to demonstrate the abstraction level from companies to their employees and the flexibility which comes from GroupIDs. Therefore the [endpoints for managing group access](https://docs.inrupt.com/developer-tools/api/javascript/solid-client/modules/acl_group.html) are used. 

## Used Libraries

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.1.1.

To interact with the Solid Pods [@inrupt/solid-client](https://www.npmjs.com/package/@inrupt/solid-client) and for authentication [@inrupt/solid-client-authn-browser](https://www.npmjs.com/package/@inrupt/solid-client-authn-browser) where used. Further the provided vocabularies [@inrupt/vocab-common-rdf](https://www.npmjs.com/package/@inrupt/vocab-common-rdf) and [@inrupt/vocab-solid](https://www.npmjs.com/package/@inrupt/vocab-solid) were utilized.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Identities

In order to try out the apps, use the following identities:

| Name | Company | WebId | Username | Password |
|------|---------|-------|----------|----------|
| Peter Amsel| Ehrlich | https://peter-amsel.solidcommunity.net/profile/card#me | peter-amsel | PeterAms3l# |
| Manon Amtmann | Grünbank | https://manon-amtmann.solidcommunity.net/profile/card#me | manon-amtmann | ManonAmtm4nn# |
| Michaela Auster | Nordwind | https://michaela-auster.solidcommunity.net/profile/card#me | michaela-auster | MichaelaAust3r# |

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
