import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';
import { Moment } from 'moment';
import { euerPod } from 'src/app/urls';
import { Buchung } from '../../interfaces/Buchung.interface';
import { EUeR } from '../../interfaces/EUeR.interface';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-add-euer-dialog',
  templateUrl: './add-euer-dialog.component.html',
  styleUrls: ['./add-euer-dialog.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AddEuerDialogComponent {
  public timeframe = new FormControl(moment(), Validators.required);
  public euer: EUeR = this.generateEUeR(moment());

  constructor(@Inject(MAT_DIALOG_DATA) public data: {buchungen: Buchung[]}) {}


  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.timeframe.value;
    ctrlValue.year(normalizedYear.year());
    this.timeframe.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.timeframe.value;
    ctrlValue.month(normalizedMonth.month());
    this.timeframe.setValue(ctrlValue);
    datepicker.close();
    this.euer = this.generateEUeR(this.timeframe.value);
  }

  private generateEUeR(timeframe: Moment): EUeR {
    const buchungen = this.data.buchungen;
    const startDate = moment(timeframe).startOf('month');
    const endDate = moment(timeframe).endOf('month');

    const euerBuchungen = buchungen.filter(
      (buchung) =>
        moment(buchung.date).isAfter(startDate) &&
        moment(buchung.date).isBefore(endDate)
    );
    const sumOfExpense = euerBuchungen
      .filter((buchung) => buchung.type == 'Ausgabe')
      .reduce((sum, buchung) => {
        sum += buchung.amount;
        return sum;
      }, 0);
    const sumOfIncome = euerBuchungen
      .filter((buchung) => buchung.type == 'Einnahme')
      .reduce((sum, buchung) => {
        sum += buchung.amount;
        return sum;
      }, 0);

    const result = sumOfIncome - sumOfExpense;

    return {
      business: 'https://nordwind.ti.rw.fau.de/profile/card#company',
      issueDate: new Date(),
      resourceUrl: `${euerPod}${new Date().getTime()}`,
      sumOfExpense,
      sumOfIncome,
      result,
      taxAccountant: 'https://ehrlich.ti.rw.fau.de/profile/card#company',
      timeframe: moment(timeframe).startOf('month').toDate(),
    };
  }
}
