import { Component, Input } from '@angular/core';
import { catchError, combineLatest, combineLatestWith, Observable, throwError } from 'rxjs';
import { CitiesService } from 'src/app/cities.service';
import { City } from 'src/app/models/city';
import { CitiesResponse } from '../../../model/city.interface';
import { select, Store } from '@ngrx/store';
import { CityState } from '../../store/reducer/city.reducer';
import { filterCities, selectCities } from '../../store/selector/city.selectors';
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
  filterText = '';
  
  constructor(private service: CitiesService, private store: Store<CityState>) {
    this.cities$ = this.store.pipe(select(selectCities));
    // If filter is applied
    this.store.pipe(select(filterCities)).subscribe(filterText => {
      this.filterText = filterText;
      this.getCities(filterText);
    })
    this.getCities();
  }

  getCities(filter: string = ''): void {
    this.clearFlags();
    const preferred$ = this.service.getPreferredCities();
    this.service.getCities(filter)
      .pipe(
        // Get the cities and the favorite at the same time
        combineLatestWith(preferred$),
        catchError(err => {
          this.errorResponse = true;
          return throwError(err);
        })
      )
      .subscribe(([citiesResponse, favoriteCities]) => {
        this.store.dispatch(loadCities(citiesResponse.data, favoriteCities.data));
        this.noResults = citiesResponse.data.length === 0;
        this.loadingData = false;
      });
  }

  private clearFlags(): void {
    this.loadingData = true;
    this.errorResponse = false;
    this.noResults = false;
  }
}
