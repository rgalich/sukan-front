import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Broadcast } from 'src/app/models/broadcast';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  constructor() { }

  broadcastSelected: BehaviorSubject<Broadcast> = new BehaviorSubject(Broadcast.ALL);
}
