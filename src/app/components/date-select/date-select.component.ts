import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/services/date/date.service';

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.less']
})
export class DateSelectComponent implements OnInit {
  dates: Date[] = [];
  dateSelected = new Date(new Date().toDateString());

  constructor(private readonly dateService: DateService) { }

  ngOnInit(): void {
    this.dateService.dates.subscribe(datesResponse => this.dates = datesResponse);

    this.dateService.dateSelected.subscribe(dateResponse => this.dateSelected = dateResponse);
  }

  dateChange() {
    this.dateService.dateSelected.next(this.dateSelected);
  }
}
