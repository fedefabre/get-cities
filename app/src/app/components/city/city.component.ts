import { Component, Input, OnInit } from '@angular/core';
import { CityInfo } from '../../model/city.interface';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent {
  @Input() city: CityInfo;
}
