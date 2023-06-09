import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryStatecityRoutingModule } from './country-statecity-routing.module';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';
import { CountryComponent } from './country/country.component';

console.warn('CountryStateCityModule is Loaded');
@NgModule({
  declarations: [ 
    StateComponent,
    CityComponent,
    CountryComponent
  ],
  imports: [
    CommonModule,
    CountryStatecityRoutingModule
  ]
})
export class CountryStatecityModule { }
