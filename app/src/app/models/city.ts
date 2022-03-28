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
export interface City {
  geonameid: number;
  name: string;
  country: string;
  subcountry?: string;
}
