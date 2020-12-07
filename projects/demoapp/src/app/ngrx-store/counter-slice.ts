import { createFeatureSlice } from '@classi/ngrx-extensions';

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
    reset: () => ({ count: 0 }),
  },
});
