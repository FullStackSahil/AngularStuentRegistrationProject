import { gender } from './../../../infrastructure/gender.interface';
import { StudentService } from '../../../_services/student.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { student } from 'src/app/infrastructure/student.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from 'src/app/infrastructure/country.interface';
import { State } from 'src/app/infrastructure/state.interface';
import { City } from 'src/app/infrastructure/city.interface';

@Component({
  selector: 'app-viewstudent',
  templateUrl: './viewstudent.component.html',
  styleUrls: ['./viewstudent.component.scss'],
})
export class ViewstudentComponent implements OnInit {
  Id: string | null | undefined;
  isNew = false;
  Title = '';
  GenderList: gender[] = [];
  CountryList: Country[] = [];
  StateList: State[] = [];
  CityList: City[] = [];
  ProfileDb = '';
  imgPath!: string;
  studentData: student = {
    id: 0,
    name: '',
    birthDate: new Date(),
    email: '',
    contact: '',
    profileImage: '',
    genderId: 0,
    address: {
      Id: 0,
      physicalAddress: '',
      postalCode: '',
      cityId: 0,
      city: {
        id: 0,
        name: '',
        stateId: 0,
        state: {
          id: 0,
          name: '',
          countryId: 0,
          country: {
            id: 0,
            name: '',
          },
        },
      },
      StudentId: 0,
    },
    gender: {
      id: 0,
      title: '',
      description: '',
    },
  };

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.GetAllCountries();
    // this.GetAllStates();
    // this.GetAllCities();
    this.studentService.getAllGenders().subscribe((response) => {
      this.GenderList = response;
    });

    this.route.paramMap.subscribe((x) => {
      this.Id = x.get('id');
    });
    // alert(this.Id);
    if (this.Id) {
      if (this.Id) {
        if (this.Id.toLocaleLowerCase() == 'Add'.toLocaleLowerCase()) {
          this.isNew = true;
          this.Title = 'Add New Student';
          this.DefaultImage();
        } else {
          this.isNew = false;
          this.Title = 'Update Student';
          this.studentService.getStudent(this.Id).subscribe(
            (data) => {
              this.studentData = data;

              console.log(this.studentData);
              this.DefaultImage();
              this.GetAllStates();
              this.GetAllCities();
            },
            (error) => {
              console.log(error);
            }
          );
        }
      }
    }
  }
  UpdateClick(): void {
    this.studentService
      .updateStudent(this.studentData.id, this.studentData)
      .subscribe(
        (response) => {
          this.snackBar.open('Student Updated', undefined, { duration: 2000 });
          console.log(response);
          setTimeout(() => {
            this.router.navigateByUrl('students');
          }, 2000);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  SaveClick(): void {
    // this.studentData.profileImage = this.imgPath;
    console.log(this.studentData);
    let hasError = false;
    if (this.studentData.name == '') {
      hasError = true;
    }
    if (hasError) {
    } else {
      this.studentService.addStudent(this.studentData).subscribe(
        (response) => {
          this.snackBar.open('Student Added Successfully', undefined, {
            duration: 3000,
          });
          console.log(response);
          setTimeout(() => {
            this.router.navigateByUrl('students');
          }, 1000);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  private DefaultImage(): void {
    if (this.studentData.profileImage) {
      this.imgPath = this.studentData.profileImage;
      this.ProfileDb = this.studentService.LocalhostPath(
        this.studentData.profileImage
      );
      // this.studentData.profileImage=this.studentData.profileImage
    } else {
      this.ProfileDb = '/assets/UserDefaultImage.jpg';
    }
  }
  ImageUpload(event: any): void {
    if (this.Id) {
      const file: File = event.target.files[0];
      this.studentService.UploadImage(this.studentData.id, file).subscribe(
        (response) => {
          this.studentData.profileImage = response;
          console.log(this.studentData.profileImage);
          this.DefaultImage();
          this.snackBar.open('Image Uploaded Successfully', undefined, {
            duration: 3000,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  GetAllCountries() {
    this.studentService.getAllCountries().subscribe((response) => {
      this.CountryList = response;
      console.log(response);
    });
  }

  GetAllStates() {
    this.studentService.getAllStates().subscribe((response) => {
      this.StateList = response;
      console.log(response);
    });
  }
  GetAllCities() {
    this.studentService.getAllCities().subscribe((response) => {
      this.CityList = response;
      console.log(response);
    });
  }

  onCountrySelected(selectedCountryId: number) {
    this.studentService.getStateOnSelectedCountry(selectedCountryId).subscribe(
      (response) => {
        this.StateList = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onStateSelected(selectStateId: number) {
    this.studentService.getCityOnSelectedState(selectStateId).subscribe(
      (response) => {
        this.CityList = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
