import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { AnalyticsTrackerConfig, defaultConfig } from './config';
import { TrackingEngine } from './engine/types';
import { EventTracking } from './tracking/event-tracking';
import { PageTracking } from './tracking/page-tracking';
import { UserTimingTracking } from './tracking/user-timing-tracking';
import { EventTrack, UserTimingTrack } from './types';

@Injectable()
export class AnalyticsTracker {
  private readonly config: AnalyticsTrackerConfig;

  constructor(
    config: AnalyticsTrackerConfig,
    private readonly pageTracking: PageTracking,
    private readonly eventTracking: EventTracking,
    private readonly userTimingTracking: UserTimingTracking,
    private readonly engine: TrackingEngine
  ) {
    this.config = { ...defaultConfig, ...config };
  }

  startTracking(): void {
    this.pageTracking.pageChange$
      .pipe(filter(() => !this.config.disableTracking))
      .subscribe(({ url }) => {
        this.engine.sendPageView(url);
      });
    this.eventTracking.events$
      .pipe(filter(() => !this.config.disableTracking))
      .subscribe((event) => {
        this.engine.sendEvent(event);
      });
    this.userTimingTracking.userTiming$
      .pipe(filter(() => !this.config.disableTracking))
      .subscribe((timing) => {
        this.engine.sendUserTiming(timing);
      });
  }

  sendEvent(event: EventTrack): void {
    this.eventTracking.push(event);
  }

  sendUserTiming(timing: UserTimingTrack): void {
    this.userTimingTracking.push(timing);
  }

  setUserContext(user: { id: string }): void {
    this.engine.setUserContext(user);
  }

  clearUserContext(): void {
    this.engine.clearUserContext();
  }

  setCustomDimensions(dimensions: Record<string, string>): void {
    this.engine.setCustomDimensions(dimensions);
  }
}
