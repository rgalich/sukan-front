import { Injectable } from '@angular/core';
import { ApolloQueryResult, gql } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from 'src/app/models/event';
import { SportService } from '../sport/sport.service';
import { filter, switchMap } from 'rxjs/operators';
import { Sport } from 'src/app/models/sport';
import { DateService } from '../date/date.service';
import moment from 'moment';
import { BroadcastService } from '../broadcast/broadcast.service';
import { Broadcast } from 'src/app/models/broadcast';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private readonly apollo: Apollo,
    private readonly sportService: SportService,
    private readonly dateService: DateService,
    private readonly broadcastService: BroadcastService,
  ) {
    this.sportService.sportSelected
    .pipe(
      filter((sportSelected) => sportSelected !== null && this.dateService.dateSelected.value !== null),
      switchMap(sportSelected => {
        return this.getEvents(moment(this.dateService.dateSelected.value).format('YYYY-MM-DD'), sportSelected, this.broadcastService.broadcastSelected.value);
      }),
    )
    .subscribe((response) => {
      this.events.next(response.data.event.map((event) => Event.fromData(event)))
    });

    this.broadcastService.broadcastSelected
    .pipe(
      filter(() =>  this.sportService.sportSelected.value !== null && this.dateService.dateSelected.value !== null),
      switchMap(broadcastSelected => {
        return this.getEvents(moment(this.dateService.dateSelected.value).format('YYYY-MM-DD'), this.sportService.sportSelected.value, broadcastSelected);
      }),
    )
    .subscribe((response) => {
      this.events.next(response.data.event.map((event) => Event.fromData(event)))
    });
  }

  events: BehaviorSubject<Event[]> = new BehaviorSubject(null);

  getEvents(date: string, sport: Sport, broadcast: Broadcast): Observable<ApolloQueryResult<any>> {
    const broadcastQuery = broadcast !== Broadcast.ALL ? broadcast : null;

    const GET_EVENTS = gql`
      query getEvents($date: timestamp! $sportId: Int $broadcast: broadcast_enum) {
        event(
          where: {
            date: {_eq: $date}
            sport_id: {_eq: $sportId}
            broadcast: {_eq: $broadcast}
          }
          order_by: {dateTime: asc}
        ) {
          id
          libelle
          subLibelle
          dateTime
          broadcast
          sport {
            id
            libelle
          }
          competition {
            id
            libelle
          }
          event_channels {
            channel {
              id
              libelle
            }
          }
        }
      }`;

      return this.apollo.watchQuery<any>({
        query: GET_EVENTS,
        variables: {
          date,
          sportId: sport.id,
          broadcast: broadcastQuery,
        }
      })
      .valueChanges;
  }
}
