import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgrxStoreComponent } from './ngrx-store.component';
import { StoreModule } from '@ngrx/store';
import * as counterStore from './counter-store';

@NgModule({
  declarations: [NgrxStoreComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(counterStore.featureName, counterStore.default),
  ],
  exports: [NgrxStoreComponent],
})
export class NgrxStoreModule {}
