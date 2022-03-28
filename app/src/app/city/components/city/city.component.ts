import { Component, Input } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { City } from '../../../models/city';
import { CitiesService } from '../../../cities.service';
import { catchError, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { CityState } from '../../store/reducer/city.reducer';
import { updatingFavorite } from '../../store/action/city.actions';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent {
  @Input() city: City;
  @Input() filterText: string = '';
  @Input() favorite = false;
  loading = false;

  constructor(private service: CitiesService, private store: Store<CityState>) { }

  toggleSelection(event: MatCheckboxChange, retry: number = 0): void {
    this.loading = true;
    // Retry 3 times until emit error to parent
    if (retry === 3) {
      throwError(() => 'An unexpected error ocurred. Please retry')
    }
    this.favorite = event.checked;
    this.service.patchPreferred(this.city.geonameid, event.checked)
      .pipe(
        catchError(err => {
          // If fail, retry
          this.toggleSelection(event, retry++);
          return throwError(() => err);
        })
      )
      .subscribe(() => {
        this.loading = false;
        this.store.dispatch(updatingFavorite(this.city.geonameid, event.checked))
      })
  }
}
