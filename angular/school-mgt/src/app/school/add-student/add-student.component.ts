import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-student',
  standalone: false,
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.scss'
})
export class AddStudentComponent {
  constructor(private dialogRef: MatDialogRef<AddStudentComponent>,) { }
  onCancel() {
    this.dialogRef.close();
  }
}
