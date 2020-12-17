import { Component, OnInit } from '@angular/core';
import { AnalyticsTracker } from '@classi/ngx-google-analytics';

@Component({
  selector: 'app-google-analytics',
  templateUrl: './google-analytics.component.html',
  styleUrls: ['./google-analytics.component.css'],
})
export class GoogleAnalyticsComponent implements OnInit {
  constructor(private readonly analytics: AnalyticsTracker) {}

  ngOnInit(): void {
    this.analytics.setUserContext({ id: 'dummyUserId' });
    this.analytics.setCustomDimensions({
      dimension1: 'value1',
      dimension3: 'value3',
    });
  }

  sendCustomEvent(): void {
    this.analytics.sendEvent({
      name: 'click',
      params: {
        event_category: 'test',
      },
    });
  }
}
