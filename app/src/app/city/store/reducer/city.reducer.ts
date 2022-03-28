import { Action, createReducer, on } from '@ngrx/store';
import { City } from 'src/app/models/city';
import * as CityActions from '../action/city.actions';

export const cityFeatureKey = 'city';

export interface CityState {
  cities: City[];
  filter: string;
  preferred: number[];
}

export const initialState: CityState = {
  cities: [],
  filter: '',
  preferred: [],
};

export const citiesReducer = createReducer(
  initialState,
  on(CityActions.loadCities,
    (state: CityState, { cities, favorites }) => {
      const { preferred, otherCities } = getCities(cities, favorites);
      return ({
        ...state,
        cities: [...preferred, ...otherCities],
        preferred: favorites
      })
    }),
  on(CityActions.applyingFilter,
    (state: CityState, { filter }) => {
      return ({
        ...state,
        filter: filter,
      })
    }),
  on(CityActions.updatingFavorite,
    (state: CityState, { geonameid, fav }) => {
      const newFavorites: number[] = fav ? [...state.preferred, geonameid] : state.preferred.filter(id => id !== geonameid);
      const { preferred, otherCities } = getCities(state.cities, newFavorites);
      return ({
        ...state,
        cities: [...preferred, ...otherCities],
        preferred: newFavorites
      })
    }),
);

export function reducer(state: CityState | undefined, action: Action): any {
  return citiesReducer(state, action);
}

function getCities(cities: City[], favorites: number[]): { preferred: City[]; otherCities: City[] } {
  const preferred = cities.filter(({ geonameid: id }: City) => favorites.includes(id)).sort((a, b) => sortAlphabetically(a, b));
  const otherCities = cities.filter(({ geonameid: id }: City) => !favorites.includes(id)).sort((a, b) => sortAlphabetically(a, b));
  return { preferred, otherCities }
}

function sortAlphabetically({ name: a }: City, { name: b }: City): number {
  if (a < b) { return -1; }
  if (a > b) { return 1; }
  return 0;
}
