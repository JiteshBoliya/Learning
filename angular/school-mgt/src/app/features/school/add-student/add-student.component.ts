import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { StudentService } from '../../../core/services/student.service';

@Component({
  selector: 'app-add-student',
  standalone: false,
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.scss'
})
export class AddStudentComponent {
  studentForm!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<AddStudentComponent>,
    private fb: FormBuilder,
    private studentService: StudentService) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  onSubmit() {
    try {
      const res = this.studentService.addStudent(this.studentForm.value);
      this.dialogRef.close(res);
    } catch (error) {
      console.log({ error });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
