import { Action, createReducer, on } from '@ngrx/store';
import { City } from 'src/app/models/city';
import * as CityActions from '../action/city.actions';

export const cityFeatureKey = 'city';

export interface CityState {
  cities: City[];
  filter: string;
  selected: City[];
}

export const initialState: CityState = {
  cities: [],
  filter: '',
  selected: []
};

export const citiesReducer = createReducer(
  initialState,
  on(CityActions.loadCities,
    (state: CityState, { cities }) => {
      debugger;
      return ({
        ...state,
        cities: [...state.cities, ...cities]
      })
    })
  );

export function reducer(state: CityState | undefined, action: Action): any {
  return citiesReducer(state, action);
}
