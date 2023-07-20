import { Country } from './../infrastructure/country.interface';
import { City } from '../infrastructure/city.interface';
import { State } from '../infrastructure/state.interface';
import { student } from 'src/app/infrastructure/student.interface';
import { gender } from '../infrastructure/gender.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentVM } from '../infrastructure/studentVM.interface';


@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseApiUrl = 'https://localhost:44380';

  constructor(private httpClient: HttpClient) {}
  getAllStudents(): Observable<student[]> {
    return this.httpClient.get<student[]>(
      this.baseApiUrl + '/api/students/GetAllStudents'
    );
  }

  getStudent(id: string): Observable<student> {
    return this.httpClient.get<student>(
      this.baseApiUrl + '/api/students/getstudent/' + id
    );
  }
  getAllGenders(): Observable<gender[]> {
    return this.httpClient.get<gender[]>(
      this.baseApiUrl + '/api/genders/GetAllGender'
    );
  }
  getAllCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(
      this.baseApiUrl + '/api/countrystatecity/country'
    );
  }
  setCountry(country:Country): Observable<any> {
    return this.httpClient.post<any>(
      this.baseApiUrl + '/api/CountryStateCity/AddCountry',country
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

  updateStudent(Id: any, stu: student): Observable<student> {
    const vm: StudentVM = {
      name: stu.name,
      birthDate: stu.birthDate,
      email: stu.email,
      contact: stu.contact,
      genderId: stu.genderId,
      cityId: stu.address.cityId,
      profileImage:stu.profileImage,
      physicalAddress: stu.address.physicalAddress,
      postalCode: stu.address.postalCode,
    };
    return this.httpClient.put<student>(
      this.baseApiUrl + '/api/students/updatestudent/' + Id,
      vm
    );
  }
  deleteStudent(id: number): Observable<any> {
    return this.httpClient.delete<any>(
      this.baseApiUrl + '/api/students/deleteStudent/' + id
    );
  }
  addStudent(stu: student): Observable<student> {
    const vm: StudentVM = {
      name: stu.name,
      birthDate: stu.birthDate,
      email: stu.email,
      contact: stu.contact,
      genderId: stu.genderId,
      cityId: stu.address.cityId,
      profileImage:stu.profileImage,
      physicalAddress: stu.address.physicalAddress,
      postalCode: stu.address.postalCode,
    };
    return this.httpClient.post<student>(
      this.baseApiUrl + '/api/students/addstudent',
      vm
    );
  }
  UploadImage(Id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profileImage', file);
    return this.httpClient.post(
      this.baseApiUrl + '/api/students/UploadImage/' + Id,
      formData,
      { responseType: 'text' }
    );
  }
  LocalhostPath(localHostImagePath: string) {
    return `${this.baseApiUrl}/${localHostImagePath}`;
  }
}
