import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.less']
})
export class EventListComponent implements OnInit {
  events: Event[] = [];

  constructor(private readonly eventService: EventService) { }

  ngOnInit() {
    this.eventService.events.subscribe(events => this.events = events);
  }

}
