import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() {
    const dates: Date[] = [];

    for (let i = 0; i < 7; i++) {
      dates.push(moment(moment().add(i, 'days').format('YYYY-MM-DD')).toDate())
    }

    this.dates.next(dates);

    this.dates.subscribe(datesResponse => this.dateSelected.next(datesResponse[0]));
  }

  dateSelected: BehaviorSubject<Date> = new BehaviorSubject(null);
  dates: BehaviorSubject<Date[]> = new BehaviorSubject(null);
}
