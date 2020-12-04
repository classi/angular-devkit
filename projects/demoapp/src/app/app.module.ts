import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { GoogleAnalyticsModule } from '@classi/ngx-google-analytics';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { GoogleAnalyticsComponent } from './google-analytics/google-analytics.component';
import { NgrxStoreModule } from './ngrx-store/ngrx-store.module';

// dummy `ga`
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any)['ga'] = (...args: any[]) => {
  console.log(`ga(${args.map((a) => JSON.stringify(a)).join(', ')})`);
};

@NgModule({
  declarations: [AppComponent, GoogleAnalyticsComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    GoogleAnalyticsModule.forRoot({}),
    StoreModule.forRoot([]),
    NgrxStoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
