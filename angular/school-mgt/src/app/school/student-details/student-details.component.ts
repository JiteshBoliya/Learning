import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-details',
  standalone: false,
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss'
})
export class StudentDetailsComponent {
  constructor(private dialogRef: MatDialogRef<StudentDetailsComponent>,) { }

  //   {
  //   name: string, currentSchool: string,
  //     division: string, transfers: { date: string, from: string, to: string } []
  // }
  student: any = {
    name: 'John Doe',
    currentSchool: 'Springfield High School',
    division: 'A',
    transfers: [
      {
        date: '2023-01-10',
        from: 'Greenwood Elementary',
        to: 'Riverdale Middle School'
      },
      {
        date: '2024-02-15',
        from: 'Riverdale Middle School',
        to: 'Springfield High School'
      }
    ]
  };

  onCancel() {
    this.dialogRef.close();
  }
}
