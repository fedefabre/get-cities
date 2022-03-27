import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCity from '../reducer/city.reducer';

export const selectCitiesState = createFeatureSelector<fromCity.CityState>(
  fromCity.cityFeatureKey,
);

export const selectCities = createSelector(
  selectCitiesState,
  (state: fromCity.CityState) => state.cities
);  

export const filterCities = createSelector(
  selectCitiesState,
  (state: fromCity.CityState) => state.filter
);  