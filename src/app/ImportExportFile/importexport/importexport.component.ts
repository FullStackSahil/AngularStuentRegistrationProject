import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-importexport',
  templateUrl: './importexport.component.html',
  styleUrls: ['./importexport.component.scss']
})
export class ImportexportComponent {
 fileToUpload: File| null=null;
 /**
  *
  */
 constructor( private http :HttpClient) {}
 onFileSelected(event:any){
  this.fileToUpload = event.target.files.items(0);
 }
 uploadFile(){
  if(this.fileToUpload){
    const formData: FormData = new FormData();
    formData.append('excelFile',this.fileToUpload,this.fileToUpload.name);
    this.http.post('api/upload', formData).subscribe((response)=>{console.log(response)},(error)=>{console.log(error)})
  }
 }
}
