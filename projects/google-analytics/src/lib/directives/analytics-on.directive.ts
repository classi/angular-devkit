import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventTracking } from '../tracking/event-tracking';
import { CustomEventTrack } from '../types';

@Directive({
  selector: '[clAnalyticsOn]',
})
export class AnalyticsOnDirective implements OnInit, OnDestroy {
  constructor(
    private readonly eventTracking: EventTracking,
    private readonly elementRef: ElementRef
  ) {}

  @Input('clAnalyticsOn') eventName!: string;
  @Input('analyticsEvent') eventFields!: CustomEventTrack;

  private readonly onDestroy$ = new Subject();

  ngOnInit() {
    if (
      typeof this.eventName !== 'string' ||
      this.eventName.trim() === '' ||
      typeof this.eventFields !== 'object'
    ) {
      throw new Error(
        '[ngx-google-analytics] clAnalyticsOn requires an event name and tracking fields. Pass inputs like `<button clAnalyticsOn="click" [analyticsEvent]="{...}">`.'
      );
    }

    fromEvent(this.elementRef.nativeElement, this.eventName)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.eventTracking.push(this.eventFields);
      });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
