import { Component, OnInit } from '@angular/core';
import { SportService } from 'src/app/services/sport/sport.service';
import { Sport } from 'src/app/models/sport';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  dates: Date[] = [];
  dateSelected = new Date(new Date().toDateString());
  sports: Sport[] = [];
  sportSelected: Sport;

  constructor(private readonly sportService: SportService) { }

  ngOnInit(): void {
    this.sportService.sports.subscribe((sports) => this.sports = sports);
    this.sportService.sportSelected.subscribe((sport) => this.sportSelected = sport);

    this.sportService.dateSelected.next(moment(this.dateSelected).format('yyyy-MM-DD'));

    this.dates.push(this.dateSelected);
    for (let i = 0; i < 6; i++) {
      let date = new Date(new Date().toDateString());
      date.setDate(date.getDate() + (i + 1))
      this.dates.push(date)
      // date = new Date(new Date().toDateString());
      // date.setDate(date.getDate() - (i + 1))
      // this.dates.push(date);
    }

    this.dates.sort((a, b) => {
      return a.getTime() - b.getTime();
    });
  }

  dateChange() {
    this.sportService.dateSelected.next(moment(this.dateSelected).format('yyyy-MM-DD'));
  }

  sportChange() {
    this.sportService.sportSelected.next(this.sportSelected);
  }
}
