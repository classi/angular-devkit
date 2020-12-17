import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleAnalyticsModule } from '../google-analytics.module';
import { EventTracking } from '../tracking/event-tracking';
import { EventTrack } from '../types';

describe('AnalyticsOnDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleAnalyticsModule.forRoot({ disableTracking: true })],
      declarations: [
        TestComponent,
        WithoutEventNameComponent,
        WithoutEventFieldsComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  test('should track an event with passed field on click', () => {
    const tracking = TestBed.inject(EventTracking);
    jest.spyOn(tracking, 'push');

    component.button.nativeElement.click();

    expect(tracking.push).toBeCalledWith(component.clickEvent);
  });

  test('should track an event with passed field on change', () => {
    const tracking = TestBed.inject(EventTracking);
    jest.spyOn(tracking, 'push');

    component.input.nativeElement.dispatchEvent(new Event('change'));

    expect(tracking.push).toBeCalledWith(component.changeEvent);
  });

  describe('invalid inputs', () => {
    test('should throw error if event name is not passed', () => {
      const _fixture = TestBed.createComponent(WithoutEventNameComponent);

      expect(() => _fixture.detectChanges()).toThrow();
    });

    test('should throw error if event fields is not passed', () => {
      const _fixture = TestBed.createComponent(WithoutEventFieldsComponent);

      expect(() => _fixture.detectChanges()).toThrow();
    });
  });
});

@Component({
  template: `
    <button
      #button
      [clAnalyticsOn]="'click'"
      [analyticsEvent]="clickEvent"
    ></button>
    <input #input [clAnalyticsOn]="'change'" [analyticsEvent]="changeEvent" />
  `,
})
class TestComponent {
  @ViewChild('button', { static: true })
  button!: ElementRef<HTMLButtonElement>;

  @ViewChild('input', { static: true })
  input!: ElementRef<HTMLInputElement>;

  clickEvent: EventTrack = {
    name: 'click',
    params: { event_category: 'test' },
  };
  changeEvent: EventTrack = {
    name: 'change',
    params: { event_category: 'test' },
  };
}

@Component({
  template: `
    <button #button clAnalyticsOn [analyticsEvent]="clickEvent"></button>
  `,
})
class WithoutEventNameComponent {
  clickEvent: EventTrack = {
    name: 'click',
    params: { event_category: 'test' },
  };
}

@Component({
  template: ` <button #button clAnalyticsOn="click"></button> `,
})
class WithoutEventFieldsComponent {}
