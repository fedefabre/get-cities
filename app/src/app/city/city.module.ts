import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { cityFeatureKey, reducer } from './store/reducer/city.reducer';
import { BoldingPipe } from './pipes/bolding.pipe';
import { CityListComponent } from './components/city-list/city-list.component';
import { CityComponent } from './components/city/city.component';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    CityListComponent,
    CityComponent,
    BoldingPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    StoreModule.forFeature(cityFeatureKey, reducer)
  ],
  exports: [
    CityListComponent,
    CityComponent,
  ]
})
export class CityModule { }
