import { Component, OnInit } from '@angular/core';
import { Broadcast } from 'src/app/models/broadcast';
import { BroadcastService } from 'src/app/services/broadcast/broadcast.service';

@Component({
  selector: 'app-broadcast-select',
  templateUrl: './broadcast-select.component.html',
  styleUrls: ['./broadcast-select.component.less']
})
export class BroadcastSelectComponent implements OnInit {
  broadcast = Broadcast;
  broadcastSelected: Broadcast;

  constructor(private readonly broadcastService: BroadcastService) { }

  ngOnInit(): void {
    this.broadcastService.broadcastSelected.next(Broadcast.ALL);

    this.broadcastService.broadcastSelected.subscribe(broadcastResponse => this.broadcastSelected = broadcastResponse);
  }

  broadcastChange() {
    this.broadcastService.broadcastSelected.next(this.broadcastSelected);
  }

}
