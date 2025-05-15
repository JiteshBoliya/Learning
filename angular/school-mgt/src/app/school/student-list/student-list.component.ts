import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';
import { AddDivComponent } from '../add-div/add-div.component';
import { StudentDetailsComponent } from '../student-details/student-details.component';
import { AddRequestComponent } from '../transfer/add-request/add-request.component';

@Component({
  selector: 'app-student-list',
  standalone: false,
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss'
})
export class StudentListComponent {
  constructor(private dialog: MatDialog) { }
  students: { id: number, name: string, div: string }[] = [
    { id: 1, name: "Aarav Sharma", div: "A" },
    { id: 2, name: "Ishita Mehta", div: "B" },
    { id: 3, name: "Rohan Verma", div: "C" },
    { id: 4, name: "Sneha Patel", div: "A" },
    { id: 5, name: "Yash Malhotra", div: "B" },
    { id: 6, name: "Ananya Joshi", div: "C" },
    { id: 7, name: "Kunal Rao", div: "A" },
    { id: 8, name: "Tanya Desai", div: "B" },
    { id: 9, name: "Aditya Singh", div: "C" },
    { id: 10, name: "Priya Nair", div: "A" }
  ]


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
