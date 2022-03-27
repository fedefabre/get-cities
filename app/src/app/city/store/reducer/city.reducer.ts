import { Action, createReducer, on } from '@ngrx/store';
import { City } from 'src/app/models/city';
import * as CityActions from '../action/city.actions';

export const cityFeatureKey = 'city';

export interface CityState {
  cities: City[];
  filter: string;
  selected: City[];
  filtering: boolean;
}

export const initialState: CityState = {
  cities: [],
  filter: '',
  selected: [],
  filtering: false
};

export const citiesReducer = createReducer(
  initialState,
  on(CityActions.loadCities,
    (state: CityState, { cities }) => {
      return ({
        ...state,
        cities
      })
    }),
    on(CityActions.applyingFilter,
      (state: CityState, { filter }) => {
        return ({
          ...state,
          filter: filter,
          filtering: true
        })
      }),
  );

export function reducer(state: CityState | undefined, action: Action): any {
  return citiesReducer(state, action);
}
