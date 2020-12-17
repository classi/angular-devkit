# google-analytics

A bridge package between Angular application and Google Analytics API (`gtag.js`).

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

#### 0. Install gtag.js

ngx-google-analytics depends on `window.gtag` variable.
Setup gtag.js following offitial guide: https://developers.google.com/analytics/devguides/collection/gtagjs

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag('js', new Date());

  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

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

#### Send events: `sendEvent(event)`

```ts
export class AppComponent {
  constructor(private readonly analytics: AnalyticsTracker) {
    this.analytics.startTracking();
  }

  sendCustomEvent() {
    this.analytics.sendEvent({
      name: 'click',
      // optional
      params: {
        event_category: 'test',
        event_label: 'foobar',
        value: 100,
      },
    });
  }
}
```

#### Send user timing: `sendUserTiming(eventFields)`

```ts
export class AppComponent {
  constructor(private readonly analytics: AnalyticsTracker) {
    this.analytics.startTracking();
  }

  sendUserTiming() {
    const before = window.performance.now();
    doSomething().then(() => {
      const after = window.performance.now();
      this.analytics.sendUserTiming({
        name: 'something',
        params: {
          value: Month.round(after - before), // * required
          event_category: 'test',
          event_label: 'foobar',
        },
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
<button clAnalyticsOn="click" [analyticsEvent]="clickEvent">Buy</button>
```

- `clAnalyticsOn="{{eventName}}"`: Set a DOM event to track.
- `[analyticsEvent]="event"`: Set event fields. See details in `sendEvent` document.

## Development

- Run tests: `nx test google-analytics`
