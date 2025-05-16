import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-details',
  standalone: false,
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss'
})
export class StudentDetailsComponent {
  constructor(
    private dialogRef: MatDialogRef<StudentDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  // student: any = {
  //   name: 'John Doe',
  //   currentSchool: 'Springfield High School',
  //   division: 'A',
  //   transfers: [
  //     {
  //       date: '2023-01-10',
  //       from: 'Greenwood Elementary',
  //       to: 'Riverdale Middle School'
  //     },
  //     {
  //       date: '2024-02-15',
  //       from: 'Riverdale Middle School',
  //       to: 'Springfield High School'
  //     }
  //   ]
  // };

  onCancel() {
    this.dialogRef.close();
  }
}
