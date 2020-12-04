import { createAction, createReducer, on, union } from '@ngrx/store';
import { createFeatureStoreSelector } from '@classi/ngrx-extensions';

// State
export interface State {
  count: number;
}

export const initialState: State = {
  count: 0,
};

// Action
const increment = createAction('counter/increment');
const reset = createAction('counter/resetCount');

export const actions = { increment, reset };
const actionsUnion = union(actions);

// Reducer
const _reducer = createReducer(
  initialState,
  on(actions.increment, (state) => ({ ...state, count: state.count + 1 })),
  on(actions.reset, () => initialState)
);

export default function reducer(state: State, action: typeof actionsUnion) {
  return _reducer(state, action);
}

// Selector
export const featureName = 'counter';
export const select = createFeatureStoreSelector<State>(featureName);
