import { Component, Input } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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
    this.service.getCities(filter)
      .pipe(
        catchError(err => {
          this.errorResponse = true;
          return throwError(err);
        })
      )
      .subscribe(({ data }: CitiesResponse) => {
        this.store.dispatch(loadCities(data));
        this.noResults = data.length === 0;
        this.loadingData = false;
      });
  }

  private clearFlags(): void {
    this.loadingData = true;
    this.errorResponse = false;
    this.noResults = false;
  }
}
