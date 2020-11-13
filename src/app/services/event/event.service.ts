import { Injectable } from '@angular/core';
import { ApolloQueryResult, gql } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Event } from 'src/app/models/event';
import { SportService } from '../sport/sport.service';
import { filter, switchMap } from 'rxjs/operators';
import { Sport } from 'src/app/models/sport';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private readonly apollo: Apollo, private readonly sportService: SportService) {
    this.sportService.sportSelected
    .pipe(
      filter((sportSelected) => sportSelected !== null && this.sportService.dateSelected.value !== null),
      switchMap(sportSelected => {
        return this.getEvents(this.sportService.dateSelected.value, sportSelected);
      }),
    )
    .subscribe((response) => {
      this.events.next(response.data.event.map((event) => Event.fromData(event)))
    })
  }

  events: BehaviorSubject<Event[]> = new BehaviorSubject(null);

  getEvents(date: string, sport: Sport): Observable<ApolloQueryResult<any>> {
    const GET_EVENTS = gql`
      query getEvents($date: timestamp! $sportId: Int) {
        event(
          where: {
            date: {_eq: $date}
            sport_id: {_eq: $sportId}
          }
          order_by: {dateTime: asc}
        ) {
          id
          libelle
          subLibelle
          dateTime
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
          sportId: sport.id
        }
      })
      .valueChanges;
  }
}
