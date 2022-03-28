import { createAction } from '@ngrx/store';
import { City } from 'src/app/models/city';

export const loadCities = createAction(
  '[City] Load Cities',
  (cities: City[], favorites: number[]) => ({ cities, favorites })
);

export const applyingFilter = createAction(
  '[City] Filter Cities',
  (filter: string) => ({ filter })
);

export const addingFavorite = createAction(
  '[City] Updating favorite Cities',
  (geonameid: number) => ({ geonameid })
);




