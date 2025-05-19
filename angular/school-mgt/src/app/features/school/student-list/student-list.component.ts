import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { StudentDetailsComponent } from '../student-details/student-details.component';
import { AddRequestComponent } from '../transfer/add-request/add-request.component';
import { StudentService } from '../../../core/services/student.service';
import { Student } from '../../../core/models/data.model';

@Component({
  selector: 'app-student-list',
  standalone: false,
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent implements OnInit {
  studentList = signal<Student[]>([]);

  constructor(
    private dialog: MatDialog,
    private studentService: StudentService) { }

  ngOnInit(): void {
    const res = this.studentService.getStudentList();
    this.studentList.set(res);
  }

  openAddStudentDialog() {
    const studentDialogRef = this.dialog.open(AddStudentComponent, {
      width: '1000px'
    }).afterClosed().subscribe(result => {
      if (result) {
        this.studentList.update(values => {
          return [...values, result];
        });
      }
    });
  }

  openStudentDetailDialog(student: any) {
    try {
      const studentDetailDialogRef = this.dialog.open(StudentDetailsComponent, {
        width: '1000px',
        data: student
      })
    } catch (error) {
      console.log({ error });
    }
  }

  openAddRequestDialog(student: any) {
    const addRequestDialogRef = this.dialog.open(AddRequestComponent, {
      width: '1000px',
      data: student
    }).afterClosed().subscribe(result => {
      if (result) {
        this.studentList.set(result);
      }
    });
  }
}
