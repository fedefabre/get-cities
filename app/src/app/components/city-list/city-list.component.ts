import { Component, Input } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { CitiesService } from 'src/app/cities.service';
import { City } from 'src/app/models/city';
import { CitiesResponse } from '../../model/city.interface';
import { select, Store } from '@ngrx/store';
import { CityState } from '../../city/store/reducer/city.reducer';
import { selectCities } from '../../city/store/selector/city.selectors';
import { loadCities } from '../../city/store/action/city.actions';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent {
  @Input() filter: HTMLInputElement;
  loadingData = true;
  noResults = false;
  errorResponse = false;
  cities$: Observable<City[]>;

  constructor(private service: CitiesService, private store: Store<CityState>) {
    this.cities$ = this.store.pipe(select(selectCities))
    this.service.getCities()
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

  //TODO: fix any type
  filtering(filter: any) {
    this.loadingData = true;
    this.service.getCities('').subscribe(({ data }: CitiesResponse) => {
      this.noResults = data.length === 0;
      this.loadingData = false;
    });
  }
}
