import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-student',
  standalone: false,
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.scss'
})
export class AddStudentComponent {
  studentForm!: FormGroup;
  constructor(private dialogRef: MatDialogRef<AddStudentComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      div: ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log('------------', this.studentForm.value);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
