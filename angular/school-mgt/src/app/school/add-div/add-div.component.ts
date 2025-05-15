import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AddStudentComponent } from '../add-student/add-student.component';

@Component({
  selector: 'app-add-div',
  standalone: false,
  templateUrl: './add-div.component.html',
  styleUrl: './add-div.component.scss'
})
export class AddDivComponent {
  constructor(private dialogRef: MatDialogRef<AddStudentComponent>,) { }
  onCancel() {
    this.dialogRef.close();
  }
}
