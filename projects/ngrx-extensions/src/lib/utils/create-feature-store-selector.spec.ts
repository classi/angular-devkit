import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { createFeatureStoreSelector } from './create-feature-store-selector';

const featureName = 'testState';
interface TestType {
  foo: string;
  bar: string;
}

describe('selector-helper', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store$: MockStore<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            [featureName]: { foo: 'foo', bar: 'bar' },
          },
        }),
      ],
    });

    store$ = TestBed.inject(MockStore);
  });

  describe('createFeatureStoreSelector', () => {
    test('testState featureStore から foo を取り出す', () => {
      const selectStateFromFeature = createFeatureStoreSelector<TestType>(
        featureName
      );
      const selected = selectStateFromFeature(store$, (state) => state.foo);

      selected.subscribe((val) => expect(val).toBe('foo'));
    });
  });
});
