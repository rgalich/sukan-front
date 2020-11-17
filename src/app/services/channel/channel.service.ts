import { Injectable } from '@angular/core';
import { ApolloQueryResult, gql } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Channel, ChannelInDay } from 'src/app/models/channel';
import { Sport } from 'src/app/models/sport';
import { DateService } from '../date/date.service';
import { SportService } from '../sport/sport.service';
import { filter, switchMap } from 'rxjs/operators';
import moment from 'moment';
import { Broadcast } from 'src/app/models/broadcast';

@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor(
      private readonly apollo: Apollo,
      private readonly sportService: SportService,
      private readonly dateService: DateService,
    ) { 
    this.sportService.sportSelected
    .pipe(
      filter((sportSelected) => sportSelected !== null && this.dateService.dateSelected.value !== null),
      switchMap(sportSelected => {
        return this.getChannels(moment(this.dateService.dateSelected.value).format('YYYY-MM-DD'), sportSelected);
      }),
    )
    .subscribe((response) => {
      const channelsInDay: ChannelInDay[] = response.data.channel_in_day.map((channel) => ChannelInDay.fromData(channel));
      const channels: Channel[] = [];

      const channelAll = new Channel();
      channelAll.libelle = 'Toutes les chaînes';
      channels.push(channelAll);

      for (const channelInDay of channelsInDay) {
        let channel = channels.find(channelResponse => channelResponse.id === channelInDay.id);
        if (!channel) {
          channel = new Channel();
          channel.id =  channelInDay.id;
          channel.libelle = channelInDay.libelle;
          channels.push(channel);
        }

        switch (channelInDay.broadcast) {
          case Broadcast.DIRECT:
            channel.eventDirectNumber += channelInDay.eventNumber;
            channelAll.eventDirectNumber += channelInDay.eventNumber;
            break;
          case Broadcast.REDIFFUSION:
            channel.eventRediffusionNumber += channelInDay.eventNumber;
            channelAll.eventRediffusionNumber += channelInDay.eventNumber;
            break;
        }
      }

      channels.sort((a,b) => (a.eventNumber < b.eventNumber) ? 1 : ((b.eventNumber < a.eventNumber) ? -1 : 0)); 
      
      this.channels.next(channels);
      this.channelSelected.next(channels[0]);
    });
  }

  channelSelected: BehaviorSubject<Channel> = new BehaviorSubject(null);
  channels: BehaviorSubject<Channel[]> = new BehaviorSubject(null);

  getChannels(date: string, sport: Sport): Observable<ApolloQueryResult<any>> {
    const GET_CHANNELS = gql`
      query getChannels($date: timestamp! $sportId: Int) {
        channel_in_day(
          where: {
            date: {_eq: $date}
            sport_id: {_eq: $sportId}
          }
        ) {
          id
          libelle
          date
          sport_id
          broadcast
          event_number
        }
      }`;

      return this.apollo.watchQuery<any>({
        fetchPolicy: 'no-cache',
        query: GET_CHANNELS,
        variables: {
          date,
          sportId: sport.id,
        }
      })
      .valueChanges;
  }
}
