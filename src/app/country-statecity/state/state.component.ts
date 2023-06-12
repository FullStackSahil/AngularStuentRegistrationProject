import { JsonPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CountryStateCityServiceService } from 'src/app/_services/country-state-city-service.service';
import { Country } from 'src/app/infrastructure/country.interface';
import { State } from 'src/app/infrastructure/state.interface';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss'],
})
export class StateComponent implements OnInit {
  CountryList: Country[] = [];

  newState = {
    id: 0,
    name: '',
    countryId: 0,
  };
  countryEntered: boolean = false;
  stateEntered: boolean = false;

  displayedColumns: string[] = ['Name', 'edit'];
  CountryDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  FilterText: string = '';
  constructor(
    private CountryStateCityServiceService: CountryStateCityServiceService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.CountryStateCityServiceService.getAllCountries().subscribe(
      (data) => {
        console.log(data);
        this.CountryList = data;
        this.CountryDataSource = new MatTableDataSource<any>(data);
        if (this.matPaginator) {
          this.CountryDataSource.paginator = this.matPaginator;
        }
        if (this.matSort) {
          this.CountryDataSource.sort = this.matSort;
        }
        // console.log(this.students);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onCountrySelected(countryId: number) {
    this.countryEntered = true;
  }
  onStateEntered(state: any) {
    //console.warn(state);
    state == '' ? (this.stateEntered = false) : (this.stateEntered = true);
  }
  SaveClick() {
    console.warn(this.newState);
    this.CountryStateCityServiceService.setState(
      this.newState as State
    ).subscribe(
      (res) => {
        console.log(res);
        this.snackBar.open('State Added Successfully', undefined, {
          duration: 3000,
        });
      },
      (e) => {
        console.log(e);
      }
    );
  }
}
