import { TestBed } from '@angular/core/testing';
import { GtagEngine, GTAG_REF } from './gtag';

describe('GtagEngine', () => {
  let engine: GtagEngine;
  let gtagRef: Gtag.Gtag;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtagRef = jest.fn() as any;
    TestBed.configureTestingModule({
      providers: [
        {
          provide: GTAG_REF,
          useValue: gtagRef,
        },
        GtagEngine,
      ],
    });
    engine = TestBed.inject(GtagEngine);
  });

  test('should create an instance', () => {
    expect(engine).toBeTruthy();
  });

  describe('pageview', () => {
    test('should set page_path and send pageview event', () => {
      engine.sendPageView('/foobar');

      expect(gtagRef).toHaveBeenNthCalledWith(1, 'set', {
        page_path: '/foobar',
        page_title: '',
      });
      expect(gtagRef).toHaveBeenNthCalledWith(2, 'event', 'pageview');
    });
  });

  describe('event', () => {
    test('should send an event', () => {
      engine.sendEvent({ name: 'login', params: { method: 'Google' } });

      expect(gtagRef).toHaveBeenNthCalledWith(1, 'event', 'login', {
        method: 'Google',
      });
    });

    test('should send an event with override params', () => {
      engine.sendEvent({
        name: 'fooAction',
        params: {
          event_category: 'fooCat',
          event_label: 'fooLabel',
          value: 100,
        },
      });

      expect(gtagRef).toHaveBeenNthCalledWith(1, 'event', 'fooAction', {
        event_category: 'fooCat',
        event_label: 'fooLabel',
        value: 100,
      });
    });
  });

  describe('user timing', () => {
    test('should send timing hit', () => {
      engine.sendUserTiming({
        name: 'fooVar',
        params: {
          event_category: 'fooCat',
          event_label: 'fooLabel',
          value: 100,
        },
      });

      expect(gtagRef).toHaveBeenNthCalledWith(1, 'event', 'timing_complete', {
        name: 'fooVar',
        event_category: 'fooCat',
        event_label: 'fooLabel',
        value: 100,
      });
    });
  });

  describe('tracking context', () => {
    test('is able to set user context', () => {
      engine.setUserContext({ id: 'foo' });

      expect(gtagRef).toHaveBeenNthCalledWith(1, 'set', { user_id: 'foo' });
    });

    test('is able to clear user context', () => {
      engine.clearUserContext();

      expect(gtagRef).toHaveBeenNthCalledWith(1, 'set', { user_id: undefined });
    });

    test('is able to set custom dimensions', () => {
      engine.setCustomDimensions({
        dimension1: 'value1',
        dimension2: 'value2',
        invalidFields: 'boo',
      });

      expect(gtagRef).toHaveBeenCalledTimes(2);
      expect(gtagRef).toHaveBeenNthCalledWith(1, 'set', {
        dimension1: 'value1',
      });
      expect(gtagRef).toHaveBeenNthCalledWith(2, 'set', {
        dimension2: 'value2',
      });
    });
  });
});
