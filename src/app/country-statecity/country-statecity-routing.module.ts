import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './city/city.component';
import { StateComponent } from './state/state.component';
import { CountryComponent } from './country/country.component';


const routes: Routes = [
  { path: '',component: CountryComponent},
  { path: 'state',component: StateComponent},
  { path: 'city',component: CityComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryStatecityRoutingModule { }
