import { waitForAsync } from '@angular/core/testing';
import { getMockStore } from '@ngrx/store/testing';
import { PayloadAction } from './vendor-exports';
import { createFeatureSlice } from './create-feature-slice';

describe('createFeatureSlice', () => {
  test('should create a store', () => {
    const slice = createFeatureSlice({
      name: 'test',
      initialState: {
        foo: 'bar',
      },
      reducers: {
        change: () => ({ foo: 'baz' }),
      },
    });
    expect(slice).toBeDefined();
    expect(slice.name).toBe('test');
    expect(slice.initialState).toEqual({ foo: 'bar' });
    expect(typeof slice.select === 'function').toBe(true);
    expect(typeof slice.reducer === 'function').toBe(true);
    expect(typeof slice.actions.change === 'function').toBe(true);
  });

  test('should genearte actions with payload', () => {
    const slice = createFeatureSlice({
      name: 'test',
      initialState: {
        foo: 'bar',
      },
      reducers: {
        change: (state, action: PayloadAction<string>) => ({
          ...state,
          foo: action.payload,
        }),
      },
    });
    const action = slice.actions.change('update');
    expect(action.payload).toBe('update');
  });

  test(
    'should connect to NgRx store',
    waitForAsync(() => {
      const slice = createFeatureSlice({
        name: 'test',
        initialState: {
          foo: 'bar',
        },
        reducers: {
          change: () => ({ foo: 'baz' }),
        },
      });

      const store = getMockStore({
        initialState: {
          [slice.name]: slice.initialState,
        },
      });
      const state$ = slice.select(store, (state) => state);
      state$.subscribe((state) => {
        expect(state.foo).toBe('bar');
      });
    })
  );
});
