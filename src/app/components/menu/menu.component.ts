import { Component, OnInit } from '@angular/core';
import { Channel } from 'src/app/models/channel';
import { ChannelService } from 'src/app/services/channel/channel.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
  channels: Channel[] = [];
  channelSelected: Channel;

  constructor(private readonly channelService: ChannelService) { }

  ngOnInit(): void {
    this.channelService.channels.subscribe(channels => this.channels = channels);
    this.channelService.channelSelected.subscribe(channel => this.channelSelected = channel);
  }

  changeChannel(channel: Channel) {
    this.channelService.channelSelected.next(channel);
  }
}
