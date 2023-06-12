import { CountryStateCityServiceService } from './../../_services/country-state-city-service.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Country } from 'src/app/infrastructure/country.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss'],
})
export class CountryComponent implements OnInit {
  // newCountry: Country | undefined;
  newCountry!: string;
  country: Country = {
    id: 0,
    name: '',
  };
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
  Search() {
    this.CountryDataSource.filter = this.FilterText;
  }
  SaveClick(): void {
    //console.warn(this.newCountry);

    // alert(this.newCountry);
    if (this.newCountry == '') {
      const checkIsNull = true;
      return void 0;
    }
    this.country.name = this.newCountry;
    this.CountryStateCityServiceService.setCountry(this.country).subscribe(
      (response) => {
        this.getAll();
        this.newCountry = '';
        this.snackBar.open('Country Added Successfully', undefined, {
          duration: 2000,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
