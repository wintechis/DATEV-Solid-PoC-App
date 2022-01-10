import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EUeR } from '../../interfaces/EUeR.interface';

@Component({
  selector: 'app-auth-euer-dialog',
  templateUrl: './auth-euer-dialog.component.html',
  styleUrls: ['./auth-euer-dialog.component.scss']
})
export class AuthEuerDialogComponent implements OnInit {

  public webId: FormControl = new FormControl("", [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/#\\w .-]*/?')]);

  constructor(@Inject(MAT_DIALOG_DATA) public data: EUeR) {}

  ngOnInit(): void {
  }

}
