import { Injectable, OnDestroy } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Sport } from 'src/app/models/sport';
import { DateService } from '../date/date.service';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class SportService implements OnDestroy {
  dateSelectedSubscription: Subscription;

  constructor(private readonly apollo: Apollo, private readonly dateService: DateService) {
    this.dateSelectedSubscription = this.dateService.dateSelected
    .pipe(
      filter((date) => date !== null),
      switchMap(date => {
        return this.getSports(moment(date).format('YYYY-MM-DD'));
      }),
    )
    .subscribe((response) => {
      const sportsData: Sport[] = response.data.sport_in_day.map((sport) => Sport.fromData(sport));
      let eventSum: number = 0;
      for (const sport of sportsData) {
        eventSum += sport.eventNumber
      };
      const sports: Sport[] = [];
      sports.push({ libelle: 'Tous les sports', eventNumber: eventSum } as Sport)
      sports.push.apply(sports, sportsData);
      this.sports.next(sports);

      let currentSportSelected: Sport = null;
      if (!this.sportSelected.value) {
        currentSportSelected = sports[0];
      } else {
        currentSportSelected = sports.find(sport => sport.id === this.sportSelected.value.id);
        if (!currentSportSelected) {
          currentSportSelected = this.sportSelected.value;
          currentSportSelected.eventNumber = 0;
        }
      }

      this.sportSelected.next(currentSportSelected);
    });
   }

  sportSelected: BehaviorSubject<Sport> = new BehaviorSubject(null);
  sports: BehaviorSubject<Sport[]> = new BehaviorSubject(null);

  getSports(date: string): Observable<ApolloQueryResult<any>> {
    const GET_SPORTS = gql`
      query getSports($date: timestamp!) {
        sport_in_day(
          where: {date: {_eq: $date}}
          order_by: {event_number: desc}
        ) {
          id
          libelle
          date
          event_number
        }
      }`;

      return this.apollo.watchQuery<any>({
        fetchPolicy: 'no-cache',
        query: GET_SPORTS,
        variables: {
          date
        }
      })
      .valueChanges;
  }

  ngOnDestroy() {
    this.dateSelectedSubscription.unsubscribe();
  }
}
