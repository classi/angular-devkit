import { createFeatureSelector, createSelector, Store } from '@ngrx/store';

export const createFeatureStoreSelector = <T>(featureName: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <S>(store$: Store<any>, mappingFunction: (state: T) => S) => {
    return store$.select(
      createSelector(createFeatureSelector<T>(featureName), mappingFunction)
    );
  };
};
