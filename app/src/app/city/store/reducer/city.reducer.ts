import { Action, createReducer, on } from '@ngrx/store';
import { City } from 'src/app/models/city';
import * as CityActions from '../action/city.actions';

export const cityFeatureKey = 'city';

export interface CityState {
  cities: City[];
  filter: string;
  preferred: Set<number>;
}

export const initialState: CityState = {
  cities: [],
  filter: '',
  preferred: new Set([225284]),
};

export const citiesReducer = createReducer(
  initialState,
  on(CityActions.loadCities,
    (state: CityState, { cities, favorites }) => {
      const citys = cities.map(city => new City(city, favorites))
      console.log(citys);
      return ({
        ...state,
        cities: citys,
        preferred: new Set(favorites)
      })
    }),
  on(CityActions.applyingFilter,
    (state: CityState, { filter }) => {
      return ({
        ...state,
        filter: filter,
      })
    }),
  on(CityActions.addingFavorite,
    (state: CityState, { geonameid }) => {
      if (state.preferred.has(geonameid)) {

      }
      return ({
        ...state
      })
    }),
);

export function reducer(state: CityState | undefined, action: Action): any {
  return citiesReducer(state, action);
}
