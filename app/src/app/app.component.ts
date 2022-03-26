import { Component } from '@angular/core';
import { CitiesService } from './cities.service';
import { CitiesResponse, CityInfo } from './model/city.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public cities: CityInfo[];
  constructor(private service: CitiesService) {
    this.service.getCities().subscribe(({ data }: CitiesResponse) => this.cities = data);
  }
}
