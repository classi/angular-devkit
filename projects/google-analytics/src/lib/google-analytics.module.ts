import { ModuleWithProviders, NgModule } from '@angular/core';
import { AnalyticsTracker } from './analytics-tracker';
import { AnalyticsTrackerConfig } from './config';
import { AnalyticsOnDirective } from './directives/analytics-on.directive';
import { TrackingEngine, GtagEngine, GTAG_REF } from './engine';
import { EventTracking } from './tracking/event-tracking';
import { PageTracking } from './tracking/page-tracking';
import { UserTimingTracking } from './tracking/user-timing-tracking';

@NgModule({
  declarations: [AnalyticsOnDirective],
  exports: [AnalyticsOnDirective],
})
export class GoogleAnalyticsModule {
  static forRoot(
    config: Partial<AnalyticsTrackerConfig> = {}
  ): ModuleWithProviders<GoogleAnalyticsModule> {
    return {
      ngModule: GoogleAnalyticsModule,
      providers: [
        {
          provide: AnalyticsTrackerConfig,
          useValue: config,
        },
        {
          provide: GTAG_REF,
          useValue: typeof window['gtag'] !== 'undefined' ? gtag : null,
        },
        GtagEngine,
        {
          provide: TrackingEngine,
          useExisting: GtagEngine,
        },
        PageTracking,
        EventTracking,
        UserTimingTracking,
        AnalyticsTracker,
      ],
    };
  }
}
