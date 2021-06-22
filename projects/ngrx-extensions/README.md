# ngrx-extensions

A set of utilities for NgRx family.

## Features

- `@ngrx/store`
  - `createFeatureStoreSelector()`

## Install

```sh
yarn add @classi/ngrx-extensions
```

## APIs

### [store] `createFeatureSlice()`

Creates a feature [`Slice`](https://redux-toolkit.js.org/tutorials/basic-tutorial#introducing-createslice).
The returned `Slice` object has additional properties: `select` and `initialState`.
`select` method is the same to returned function by `createFeatureStoreSelector`.

See details in [counter-slice.ts](/projects/demoapp/src/app/ngrx-store/counter-slice.ts)

```ts
// counter-slice.ts
import { createFeatureSlice, PayloadAction } from '@classi/ngrx-extensions';

export type State = {
  count: number;
};

const initialState: State = {
  count: 0,
};

export default createFeatureSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: () => ({ ...state, count: state.count + 1 }),
    set: (state, action: PayloadAction<number>) => ({
      ...state,
      count: action.payload,
    }),
    reset: () => ({ count: 0 }),
  },
});
```

```ts
import { Store } from '@ngrx/store';
import counterSlice from './counter-slice';

@Component({})
export class SomeComponent {
  constructor(private readonly store: Store<{}>) {}

  // Retrieve a scoped state from the store
  readonly count$ = counterSlice.select(this.store, (state) => state.count);

  increment() {
    this.store.dispatch(counterSlice.actions.increment());
  }

  setCount(count: number) {
    this.store.dispatch(counterSlice.actions.set(count));
  }

  reset() {
    this.store.dispatch(counterSlice.actions.reset());
  }
}
```

### [store] `createFeatureStoreSelector()`

See details in [counter-store.ts](/projects/demoapp/src/app/ngrx-store/counter-store.ts)

```ts
// counter-store.ts
export default function reducer(state: State, action: typeof actionsUnion) {
  return _reducer(state, action);
}

export const featureName = 'counter';
export const select = createFeatureStoreSelector<State>(featureName);
```

```ts
import { Store } from '@ngrx/store';
import * as counterStore from './counter-store';

@Component({})
export class SomeComponent {
  constructor(private readonly store: Store<{}>) {}

  // Retrieve a scoped state from the feature store
  readonly count$ = counterStore.select(this.store, (state) => state.count);
}
```
