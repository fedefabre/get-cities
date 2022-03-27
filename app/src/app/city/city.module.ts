import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { cityFeatureKey, reducer } from './store/reducer/city.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(cityFeatureKey, reducer)
  ]
})
export class CityModule { }
