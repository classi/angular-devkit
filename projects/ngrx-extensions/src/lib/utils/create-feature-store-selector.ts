import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import type { Observable } from 'rxjs';

type MapFn<T, U> = (from: T) => U;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyTypeStore = Store<any>;

export type FeatureStoreSelector<R> = <S>(
  store: AnyTypeStore,
  mapFn: MapFn<R, S>
) => Observable<S>;

export const createFeatureStoreSelector = <R>(
  name: string
): FeatureStoreSelector<R> => {
  return <S>(store: AnyTypeStore, mapFn: MapFn<R, S>) => {
    return store.select(createSelector(createFeatureSelector<R>(name), mapFn));
  };
};
