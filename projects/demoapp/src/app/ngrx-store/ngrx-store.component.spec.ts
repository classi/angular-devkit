import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import * as counterStore from './counter-store';
import counterSlice from './counter-slice';
import { NgrxStoreComponent } from './ngrx-store.component';

describe('NgrxStoreComponent', () => {
  let component: NgrxStoreComponent;
  let fixture: ComponentFixture<NgrxStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgrxStoreComponent],
      providers: [
        provideMockStore({
          initialState: {
            [counterStore.featureName]: counterStore.initialState,
            [counterSlice.name]: counterSlice.initialState,
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgrxStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
