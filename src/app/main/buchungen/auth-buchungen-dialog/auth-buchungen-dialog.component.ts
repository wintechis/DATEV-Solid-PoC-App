import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth-buchungen-dialog',
  templateUrl: './auth-buchungen-dialog.component.html',
  styleUrls: ['./auth-buchungen-dialog.component.scss']
})
export class AuthBuchungenDialogComponent implements OnInit {

  public webId: FormControl = new FormControl("", [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/#\\w .-]*/?')]);

  constructor(
    public dialogRef: MatDialogRef<AuthBuchungenDialogComponent>) {
    }

  ngOnInit(): void {
  }

}
