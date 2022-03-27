import { Component, Input } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { CitiesService } from 'src/app/cities.service';
import { CitiesResponse, CityInfo } from '../../model/city.interface';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent {
  @Input() filter: HTMLInputElement;
  cities: CityInfo[];
  loadingData = true;
  noResults = false;
  errorResponse = false;

  constructor(private service: CitiesService) {
    this.service.getCities('asasasas')
      .pipe(
        catchError(err => {
          this.errorResponse = true;
          return throwError(err);
        })
      )
      .subscribe(({ data }: CitiesResponse) => {
        this.cities = data;
        this.noResults = data.length === 0;
        this.loadingData = false;
      });
  }

  //TODO: fix any type
  filtering(filter: any) {
    this.loadingData = true;
    this.service.getCities('').subscribe(({ data }: CitiesResponse) => {
      this.cities = data
      this.noResults = data.length === 0;
      this.loadingData = false;
    });
  }
}
