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

export const updatingFavorite = createAction(
  '[City] Updating favorite City',
  (geonameid: number, fav: boolean) => ({ geonameid, fav })
);