import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgrxStoreComponent } from './ngrx-store.component';
import { StoreModule } from '@ngrx/store';
import * as counterStore from './counter-store';
import counterSlice from './counter-slice';

@NgModule({
  declarations: [NgrxStoreComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(counterStore.featureName, counterStore.default),
    StoreModule.forFeature(counterSlice.name, counterSlice.reducer),
  ],
  exports: [NgrxStoreComponent],
})
export class NgrxStoreModule {}
