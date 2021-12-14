import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-oidc-dialog',
  templateUrl: './oidc-dialog.component.html',
  styleUrls: ['./oidc-dialog.component.scss']
})
export class OidcDialogComponent  {

  constructor(public dialogRef: MatDialogRef<OidcDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {url: string, name: string}[],) { }

}
