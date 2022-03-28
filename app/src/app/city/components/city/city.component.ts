import { Component, Input } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { City } from '../../../models/city';
import { CitiesService } from '../../../cities.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent {
  @Input() city: City;
  @Input() filterText: string = '';

  constructor(private service: CitiesService) { }

  toggleSelection(event: MatCheckboxChange): void {
    this.service.patchPreferred(this.city.geonameid, event.checked).subscribe(a => {
      console.log(a);
    })
  }
}
