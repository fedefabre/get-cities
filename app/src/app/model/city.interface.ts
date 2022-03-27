import { City } from '../models/city';
export interface CitiesResponse {
  data: City[];
  total: number;
  links: {
    first: string;
    next?: string;
    prev?: string;
    last: string;
  };
  filter?: string;
};