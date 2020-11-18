import { Component, OnInit } from '@angular/core';
import { Channel } from 'src/app/models/channel';
import { ChannelService } from 'src/app/services/channel/channel.service';
import { DrawerService } from 'src/app/services/drawer/drawer.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.less']
})
export class DrawerComponent implements OnInit {
  visible = false;
  channels: Channel[] = [];
  channelSelected: Channel;

  constructor(private readonly drawerService: DrawerService, private readonly channelService: ChannelService) { }

  ngOnInit(): void {
    this.drawerService.visible.subscribe(visible => this.visible = visible);
    this.channelService.channels.subscribe(channels => this.channels = channels);
    this.channelService.channelSelected.subscribe(channel => this.channelSelected = channel);
  }

  changeChannel(channel: Channel) {
    this.channelService.channelSelected.next(channel);
  }
}
