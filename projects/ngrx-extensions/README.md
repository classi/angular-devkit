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
