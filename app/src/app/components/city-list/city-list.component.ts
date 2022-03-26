import { Component, Input, OnInit } from '@angular/core';
import { CityInfo } from '../../model/city.interface';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent {
  @Input() cities: CityInfo[];
}
