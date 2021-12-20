import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-buchung-dialog',
  templateUrl: './add-buchung-dialog.component.html',
  styleUrls: ['./add-buchung-dialog.component.scss'],
})
export class AddBuchungDialogComponent {
  public buchung: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddBuchungDialogComponent>,
    private fb: FormBuilder
  ) {
    this.buchung = fb.group({
      id: ['', Validators.required],
      date: [new Date()],
      type: ['Einnahme'],
      amount: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

}
