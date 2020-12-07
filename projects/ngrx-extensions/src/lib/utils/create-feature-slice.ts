import {
  createSlice,
  CreateSliceOptions,
  Slice,
  SliceCaseReducers,
} from '@reduxjs/toolkit';
import {
  createFeatureStoreSelector,
  FeatureStoreSelector,
} from './create-feature-store-selector';

export type FeatureSlice<
  State,
  Reducers extends SliceCaseReducers<State>,
  Name extends string
> = Pick<Slice<State, Reducers, Name>, 'name' | 'reducer' | 'actions'> & {
  select: FeatureStoreSelector<State>;
  initialState: Readonly<State>;
};

export function createFeatureSlice<
  S = unknown,
  R extends SliceCaseReducers<S> = SliceCaseReducers<S>,
  N extends string = string
>(options: CreateSliceOptions<S, R, N>): FeatureSlice<S, R, N> {
  const { reducer, actions, name } = createSlice(options);
  return {
    name,
    reducer,
    actions,
    select: createFeatureStoreSelector<S>(name),
    initialState: options.initialState,
  };
}
