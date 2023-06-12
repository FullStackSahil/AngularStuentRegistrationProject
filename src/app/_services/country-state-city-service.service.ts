import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Country } from '../infrastructure/country.interface';
import { State } from '../infrastructure/state.interface';
import { City } from '../infrastructure/city.interface';

@Injectable({
  providedIn: 'root',
})
export class CountryStateCityServiceService {
  constructor(private readonly httpClient: HttpClient) {}
  private baseApiUrl = 'https://localhost:44380';
  getAllCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(
      this.baseApiUrl + '/api/countrystatecity/country'
    );
  }
  setCountry(country: Country): Observable<any> {
    return this.httpClient.post<any>(
      this.baseApiUrl + '/api/CountryStateCity/AddCountry',
      country
    );
  }
  setState(state: State): Observable<any> {
    return this.httpClient.post<any>(
      this.baseApiUrl + '/api/CountryStateCity/AddState',
      state
    );
  }

  getAllStates(): Observable<State[]> {
    return this.httpClient.get<State[]>(
      this.baseApiUrl + '/api/countrystatecity/state'
    );
  }
  getAllCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(
      this.baseApiUrl + '/api/countrystatecity/city'
    );
  }

  getStateOnSelectedCountry(id: number): Observable<State[]> {
    return this.httpClient.get<State[]>(
      this.baseApiUrl + '/api/countrystatecity/StateByCountryId/' + id
    );
  }

  getCityOnSelectedState(id: number): Observable<City[]> {
    return this.httpClient.get<City[]>(
      this.baseApiUrl + '/api/countrystatecity/CityByStateId/' + id
    );
  }
}
