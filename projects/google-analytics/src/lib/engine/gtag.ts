import { Inject, Injectable, InjectionToken } from '@angular/core';
import { UserContext, EventTrack, UserTimingTrack } from '../types';
import { TrackingEngine } from './types';

export const GTAG_REF = new InjectionToken<Gtag.Gtag | null>('GTAG_REF');

@Injectable()
export class GtagEngine implements TrackingEngine {
  constructor(@Inject(GTAG_REF) private readonly gtagRef: Gtag.Gtag | null) {}

  setUserContext(user: UserContext): void {
    if (this.gtagRef) {
      this.gtagRef('set', { user_id: user.id });
    }
  }

  clearUserContext(): void {
    if (this.gtagRef) {
      this.gtagRef('set', { user_id: undefined });
    }
  }

  setCustomDimensions(dimensions: Record<string, string>): void {
    if (this.gtagRef) {
      for (const key of Object.keys(dimensions)) {
        if (key.match(/^dimension[0-9]+$/)) {
          this.gtagRef('set', { [key]: dimensions[key] });
        }
      }
    }
  }

  sendPageView(url: string): void {
    if (this.gtagRef) {
      /**
       * See https://developers.google.com/gtagjs/reference/event#page_view
       */
      this.gtagRef('set', { page_path: url, page_title: document.title });
      this.gtagRef('event', 'pageview');
    }
  }

  sendEvent(event: EventTrack): void {
    if (this.gtagRef) {
      /**
       * See https://developers.google.com/gtagjs/reference/api#event
       * See https://developers.google.com/analytics/devguides/collection/gtagjs/events
       */
      if (event.params) {
        this.gtagRef('event', event.name, event.params);
      } else {
        this.gtagRef('event', event.name);
      }
    }
  }

  sendUserTiming(userTiming: UserTimingTrack): void {
    if (this.gtagRef) {
      /**
       * See https://developers.google.com/analytics/devguides/collection/gtagjs/user-timings
       * See https://developers.google.com/gtagjs/reference/event#timing_complete
       */
      this.gtagRef('event', 'timing_complete', {
        name: userTiming.name,
        ...userTiming.params,
      });
    }
  }
}
