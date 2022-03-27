import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { applyingFilter } from './city/store/action/city.actions';
import { CityState } from './city/store/reducer/city.reducer';
import { debounce, debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  private subject: Subject<string> = new Subject();

  constructor(private store: Store<CityState>) { }

  ngOnInit() {
    // Wait at least half a second until the last key pressed avoiding dispatching several searches
    this.subject.pipe(debounceTime(500)).subscribe(searchTextValue => {
      this.store.dispatch(applyingFilter(searchTextValue));
    });
  }

  inputKeyPressed(event: any) {
    const searchedText = event.target.value;
    // Search with 3 letters or when input is empty to return all list
    if (searchedText.length === 0 || searchedText.length > 2) {
      this.subject.next(searchedText);
    }
  }
}
