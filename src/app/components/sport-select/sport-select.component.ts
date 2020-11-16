import { Component, OnInit } from '@angular/core';
import { Sport } from 'src/app/models/sport';
import { SportService } from 'src/app/services/sport/sport.service';

@Component({
  selector: 'app-sport-select',
  templateUrl: './sport-select.component.html',
  styleUrls: ['./sport-select.component.less']
})
export class SportSelectComponent implements OnInit {
  sports: Sport[] = [];
  sportSelected: Sport;

  constructor(private readonly sportService: SportService) { }

  ngOnInit(): void {
    this.sportService.sports.subscribe((sports) => this.sports = sports);
    this.sportService.sportSelected.subscribe((sport) => this.sportSelected = sport);
  }

  sportChange() {
    this.sportService.sportSelected.next(this.sportSelected);
  }
}
