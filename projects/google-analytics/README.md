# google-analytics

A bridge package between Angular application and Google Analytics API.

## Features

- Page view tracking
- Custom event tracking
- User timing tracking
- `[clAnalyticsOn]` directive for tracking DOM events

## Install

```sh
yarn add @classi/ngx-google-analytics
```

## Usage

### Setup

#### 1. Install `GoogleAnalyticsModule` into root NgModule.

```ts
import { GoogleAnalyticsModule } from '@classi/ngx-google-analytics';

@NgModule({
  imports: [GoogleAnalyticsModule.forRoot(options)],
})
export class AppModule {}
```

**`GoogleAnalyticsModule.forRoot` Options**

- `disableTracking?: boolean`: Disable all tracking. Usually for development.

#### 2. Start tracking in bootstrapping

To track all page view events with Angular router, start tracking before the initial navigation.
Typically, the best place to start tracking is the constructor of `AppComponent`.

```ts
export class AppComponent {
  constructor(private readonly analytics: AnalyticsTracker) {
    this.analytics.startTracking();
  }
}
```

**Notes**

- If `window['ga']` global object doesn't exist, `GoogleAnalyticsModule` will do nothing.

### `AnalyticsTracker`

The central API of `@classi/ngx-google-analytics`.

#### Set user context: `setUserContext(user)` / `clearUserContext()`

```ts
export class AppComponent {
  constructor(private readonly analytics: AnalyticsTracker) {
    this.analytics.startTracking();
  }

  setUserId(userId: string) {
    this.analytics.setUserContext({ id: userId });
    this.analytics.clearUserContext();
  }
}
```

#### Set custom dimensions: `setCustomDimensions(dimensions)`

```ts
export class AppComponent {
  constructor(private readonly analytics: AnalyticsTracker) {
    this.analytics.startTracking();
  }

  setCustomDimensions(dimensions: Record<string, string>) {
    this.analytics.setCustomDimensions(dimensions);
  }
}
```

#### Send custom events: `captureCustomEvent(eventFields)`

```ts
export class AppComponent {
  constructor(private readonly analytics: AnalyticsTracker) {
    this.analytics.startTracking();
  }

  sendCustomEvent() {
    this.analytics.captureCustomEvent({
      category: 'test', // * required
      action: 'click', // * required
      label: 'foobar', //   optional
      value: 100, //   optional
    });
  }
}
```

#### Send user timing: `captureUserTiming(eventFields)`

```ts
export class AppComponent {
  constructor(private readonly analytics: AnalyticsTracker) {
    this.analytics.startTracking();
  }

  sendUserTiming() {
    const before = window.performance.now();
    doSomething().then(() => {
      const after = window.performance.now();
      this.analytics.captureUserTiming({
        category: 'test',                   // * required
        name: 'something',                  // * required
        value: Month.round(after - before), // * required
        label: 'foobar',                    //   optional
      });
    });
  }
}
```

### `AnalyticsOnDirective`: `<button clAnalyticsOn>`

A directive to bind single DOM event and event tracking.
Import `GoogleAnalyticsModule` to enable it.

```ts
@NgModule({
  imports: [GoogleAnalyticsModule],
})
export class SomeModule {}
```

```html
<button
  clAnalyticsOn="click"
  [analyticsEvent]="{ category: 'demoapp', action: 'buy' }"
>
  Buy
</button>
```

- `clAnalyticsOn="{{eventName}}"`: Set a DOM event to track.
- `[analyticsEvent]="eventFields"`: Set event fields.

## Development

- Run tests: `nx test google-analytics`
