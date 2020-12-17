import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AnalyticsTracker } from './analytics-tracker';
import { TrackingEngine } from './engine/types';
import { GoogleAnalyticsModule } from './google-analytics.module';
import { EventTrack, UserTimingTrack } from './types';

describe('AnalyticsTracker', () => {
  let service: AnalyticsTracker;
  let engine: TrackingEngine;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, GoogleAnalyticsModule.forRoot()],
      providers: [],
    });
    service = TestBed.inject(AnalyticsTracker);
    engine = TestBed.inject(TrackingEngine);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should track page change event', () => {
    const loc = TestBed.inject(Location);
    jest.spyOn(engine, 'sendPageView');

    service.startTracking();
    loc.go('/foobar');

    expect(engine.sendPageView).toBeCalledWith('/foobar');
  });

  it('should track custom event', () => {
    jest.spyOn(engine, 'sendEvent');

    service.startTracking();

    const event: EventTrack = {
      name: 'click',
      params: {
        event_category: 'test',
        event_label: 'test clicked',
      },
    };

    service.sendEvent(event);

    expect(engine.sendEvent).toBeCalledWith(event);
  });

  it('should track user-timing', () => {
    jest.spyOn(engine, 'sendUserTiming');

    service.startTracking();

    const timing: UserTimingTrack = {
      name: 'click',
      params: {
        event_category: 'test',
        event_label: 'test timing',
        value: 100,
      },
    };

    service.sendUserTiming(timing);

    expect(engine.sendUserTiming).toBeCalledWith(timing);
  });

  it('should be able to set user context', () => {
    jest.spyOn(engine, 'setUserContext');

    service.setUserContext({ id: 'test' });

    expect(engine.setUserContext).toBeCalledWith({ id: 'test' });
  });

  it('should be able to clear user context', () => {
    jest.spyOn(engine, 'clearUserContext');

    service.clearUserContext();

    expect(engine.clearUserContext).toBeCalled();
  });

  it('should be able to set custom dimensions', () => {
    jest.spyOn(engine, 'setCustomDimensions');

    service.setCustomDimensions({
      dimension1: 'value1',
      dimension2: 'value2',
    });

    expect(engine.setCustomDimensions).toBeCalledWith({
      dimension1: 'value1',
      dimension2: 'value2',
    });
  });
});
