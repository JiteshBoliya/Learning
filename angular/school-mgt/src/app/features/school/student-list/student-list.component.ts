import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { AddDivComponent } from '../add-div/add-div.component';
import { StudentDetailsComponent } from '../student-details/student-details.component';
import { AddRequestComponent } from '../transfer/add-request/add-request.component';
import { StudentService } from '../../../core/services/student.service';
import { Student } from '../../../core/models/student.model';

@Component({
  selector: 'app-student-list',
  standalone: false,
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  constructor(
    private dialog: MatDialog,
    private studentService: StudentService) { }

  ngOnInit(): void {
    this.students = this.studentService.getStudentList()
  }


  openAddStudentDialog() {
    const studentDialogRef = this.dialog.open(AddStudentComponent, {
      width: '1000px'
    });
  }

  // openAddDivDialog() {
  //   const divDialogRef = this.dialog.open(AddDivComponent, {
  //     width: '1000px'
  //   });
  // }

  openStudentDetailDialog() {
    const studentDetailDialogRef = this.dialog.open(StudentDetailsComponent, {
      width: '1000px'
    });
  }

  openAddRequestDialog() {
    const addRequestDialogRef = this.dialog.open(AddRequestComponent, {
      width: '1000px'
    });
  }
}
