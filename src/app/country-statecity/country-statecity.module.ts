import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryStatecityRoutingModule } from './country-statecity-routing.module';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';
import { CountryComponent } from './country/country.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

console.warn('CountryStateCityModule is Loaded');
@NgModule({
  declarations: [StateComponent, CityComponent, CountryComponent],
  imports: [
    CommonModule,
    CountryStatecityRoutingModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSelectModule,
  ],
})
export class CountryStatecityModule {}
