import { createFeatureSlice, PayloadAction } from '@classi/ngrx-extensions';

export type State = {
  count: number;
};

const initialState: State = {
  count: 0,
};

export default createFeatureSlice({
  name: 'counterV2',
  initialState,
  reducers: {
    increment: (state) => ({ count: state.count + 1 }),
    set: (state, action: PayloadAction<number>) => ({ count: action.payload }),
    reset: () => ({ count: 0 }),
  },
});
