import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as counterStore from './counter-store';

@Component({
  selector: 'app-ngrx-store',
  templateUrl: './ngrx-store.component.html',
  styleUrls: ['./ngrx-store.component.css'],
})
export class NgrxStoreComponent implements OnInit {
  constructor(private readonly store: Store) {}

  readonly count$ = counterStore.select(this.store, (state) => state.count);

  ngOnInit(): void {
    setInterval(() => {
      this.store.dispatch(counterStore.actions.increment());
    }, 1000);
  }
}
