import { ModuleWithProviders, NgModule } from '@angular/core';
import { AnalyticsTracker } from './analytics-tracker';
import { AnalyticsTrackerConfig } from './config';
import { GoogleAnalyticsAdapter } from './ga';
import { EventTracking } from './tracking/event-tracking';
import { PageTracking } from './tracking/page-tracking';
import { UserTimingTracking } from './tracking/user-timing-tracking';
import { AnalyticsOnDirective } from './directives/analytics-on.directive';

export function createAdapter(): GoogleAnalyticsAdapter {
  const gaInstance = typeof window['ga'] !== 'undefined' ? ga : null;
  return new GoogleAnalyticsAdapter(gaInstance);
}

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
          provide: GoogleAnalyticsAdapter,
          useFactory: createAdapter,
        },
        PageTracking,
        EventTracking,
        UserTimingTracking,
        AnalyticsTracker,
      ],
    };
  }
}
