export class City {
  geonameid: number;
  name: string;
  country: string;
  preferred: boolean;
  subcountry?: string;

  constructor({ geonameid, name, country, subcountry = '' }: any, favorites: number[]) {
    this.geonameid = geonameid;
    this.name = name;
    this.country = country;
    this.subcountry = subcountry;
    this.preferred = favorites.some( id => id === this.geonameid);
  }
}
