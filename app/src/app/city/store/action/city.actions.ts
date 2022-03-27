import { createAction, props } from '@ngrx/store';
import { City } from 'src/app/models/city';

export const loadCities = createAction(
  '[City] Load Cities',
  (cities: City[]) => ({ cities })
);




