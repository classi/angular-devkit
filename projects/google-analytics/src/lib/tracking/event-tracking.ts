import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { EventTrack } from '../types';

@Injectable()
export class EventTracking {
  private readonly eventsSubject = new ReplaySubject<EventTrack>(1);

  get events$(): Observable<EventTrack> {
    return this.eventsSubject.asObservable();
  }

  push(event: EventTrack): void {
    this.eventsSubject.next(event);
  }
}
