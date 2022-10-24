import { Component } from '@angular/core';

import 'devextreme/localization/globalize/number';
import 'devextreme/localization/globalize/date';
import 'devextreme/localization/globalize/currency';
import 'devextreme/localization/globalize/message';

import deMessages from 'devextreme/localization/messages/de.json';
import ruMessages from 'devextreme/localization/messages/ru.json';

import deCldrData from 'devextreme-cldr-data/de.json';
import ruCldrData from 'devextreme-cldr-data/ru.json';
import supplementalCldrData from 'devextreme-cldr-data/supplemental.json';

import Globalize from 'globalize';
import { Locale, Payment, Service } from './app.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Service],
  preserveWhitespaces: true,
})
export class AppComponent {
  locale: string;

  locales: Locale[];

  payments: Payment[];

  formatMessage = Globalize.formatMessage.bind(Globalize);

  constructor(private service: Service) {
    this.locale = this.getLocale();
    this.payments = service.getPayments();
    this.locales = service.getLocales();

    this.initGlobalize();
    Globalize.locale(this.locale);
  }

  initGlobalize() {
    Globalize.load(deCldrData, ruCldrData, supplementalCldrData);
    Globalize.loadMessages(deMessages);
    Globalize.loadMessages(ruMessages);
    Globalize.loadMessages(this.service.getDictionary());
  }

  changeLocale(selectBox) {
    this.setLocale(selectBox.instance.option('value'));
    parent.document.location.reload();
  }

  getLocale() {
    const locale = sessionStorage.getItem('locale');
    return locale != null ? locale : 'de';
  }

  setLocale(locale) {
    sessionStorage.setItem('locale', locale);
  }
}
