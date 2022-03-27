import { createAction, props, Action } from '@ngrx/store';
import { City } from 'src/app/models/city';

export const loadCities = createAction(
  '[City] Load Cities',
  (cities: City[]) => ({ cities })
);

export const applyingFilter = createAction(
  '[City] Filter Cities',
  (filter: string) => ({ filter })
);




