import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImportexportService {
  private baseApiUrl = 'https://localhost:44380';
  constructor(private http: HttpClient) {}
  uploadExcelFile(file: any): Observable<any> {
    const formData = new FormData();
    formData.append('excelFile', file);
    return this.http.post(this.baseApiUrl + 'api/upload', formData);
  }

  UploadImage(Id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('profileImage', file);
    return this.http.post(
      this.baseApiUrl + '/api/students/UploadImage/' + Id,
      formData,
      { responseType: 'text' }
    );
  }
}
