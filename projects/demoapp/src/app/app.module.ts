import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { GoogleAnalyticsModule } from '@classi/ngx-google-analytics';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { GoogleAnalyticsComponent } from './google-analytics/google-analytics.component';
import { NgrxStoreModule } from './ngrx-store/ngrx-store.module';

// dummy `gtag`
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any)['gtag'] = (...args: any[]) => {
  console.log(`gtag(${args.map((a) => JSON.stringify(a)).join(', ')})`);
};

@NgModule({
  declarations: [AppComponent, GoogleAnalyticsComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' }),
    GoogleAnalyticsModule.forRoot({}),
    StoreModule.forRoot([]),
    StoreDevtoolsModule.instrument({}),
    NgrxStoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
