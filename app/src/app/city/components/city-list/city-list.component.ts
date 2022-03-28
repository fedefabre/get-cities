import { Component, Input } from '@angular/core';
import { catchError, combineLatest, combineLatestWith, Observable, throwError } from 'rxjs';
import { CitiesService } from 'src/app/city/cities.service';
import { City } from 'src/app/city/models/city';
import { select, Store } from '@ngrx/store';
import { CityState } from '../../store/reducer/city.reducer';
import { filterCities, selectCities, selectPrefer } from '../../store/selector/city.selectors';
import { loadCities } from '../../store/action/city.actions';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent {
  @Input() filter: HTMLInputElement;

  // Flags used for UI
  loadingData = true;
  noResults = false;
  errorResponse = false;

  // Set of cities
  cities$: Observable<City[]>;
  // Set of favorites
  preferred: number[];
  // Initial clean filter
  filterText = '';

  constructor(private service: CitiesService, private store: Store<CityState>) {
    this.cities$ = this.store.pipe(select(selectCities));
    this.store.pipe(select(selectPrefer)).subscribe( favorites => this.preferred = favorites);

    // Get cities each time a filter is applied
    this.store.pipe(select(filterCities)).subscribe(filterText => {
      this.filterText = filterText;
      this.getCities(filterText);
    })

    // Get cities the first time
    this.getCities();
  }

  getCities(filter: string = '', retry: number = 0): void {
    // Retry 3 times until show error message
    if (retry === 3) {
      this.errorResponse = true;
    }

    this.clearFlags();

    // Get the cities and preferred cities at the same time using combineLatestWith
    const preferred$ = this.service.getPreferredCities();
    this.service.getCities(filter)
      .pipe(
        combineLatestWith(preferred$),
        catchError(err => {
          // If fail, retry
          this.getCities(filter, retry++);
          return throwError(() => err);
        })
      )
      .subscribe(([citiesResponse, favoriteCities]) => {
        this.store.dispatch(loadCities(citiesResponse.data, favoriteCities.data));
        this.noResults = citiesResponse.data.length === 0;
        this.loadingData = false;
      });
  }

  trackBy(index: number, city: City) {
    return city.geonameid;
  }

  private clearFlags(): void {
    this.loadingData = true;
    this.errorResponse = false;
    this.noResults = false;
  }
}
