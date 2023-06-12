import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { student } from '../infrastructure/student.interface';
import { StudentService } from '../_services/student.service';
import { Input } from '@angular/core';
import { Router, withDebugTracing } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
})
export class StudentsComponent implements OnInit {
  students: student[] = [];
  // @Input() item='';
  displayedColumns: string[] = [
    'Name',
    'Email',
    'address',
    'birthDate',
    'Gender',
    'contact',
    'edit',
  ];

  dataSource: MatTableDataSource<student> = new MatTableDataSource<student>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;
  FilterText: string = '';

  constructor(
    private studentService: StudentService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.studentService.getAllStudents().subscribe(
      (studentData) => {
        this.students = studentData;
        console.log(studentData);
        this.dataSource = new MatTableDataSource<student>(studentData);
        if (this.matPaginator) {
          this.dataSource.paginator = this.matPaginator;
        }
        if (this.matSort) {
          this.dataSource.sort = this.matSort;
        }
        // console.log(this.students);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  FilterStudent() {
    this.dataSource.filter = this.FilterText;
  }
  DeleteClick(id: number) {
    let confirm = window.confirm();
    if (!confirm) return;
    this.studentService.deleteStudent(id).subscribe(
      (response) => {
        this.snackBar.open('Student Deleted', undefined, { duration: 2000 });
        this.getAll();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
