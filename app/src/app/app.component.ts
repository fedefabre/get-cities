import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { applyingFilter } from './city/store/action/city.actions';
import { CityState } from './city/store/reducer/city.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  filter = '';

  constructor(private store: Store<CityState>) { }

  filtering(event: any) {
    console.log('dispatching', event.target.value)
    this.store.dispatch(applyingFilter(event.target.value));
  }
}
