import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SchoolService } from '../../../core/services/school.service';

@Component({
  selector: 'app-add-school',
  standalone: false,
  templateUrl: './add-school.component.html',
  styleUrl: './add-school.component.scss'
})
export class AddSchoolComponent {
  schoolForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddSchoolComponent>,
    private fb: FormBuilder,
    private schoolService: SchoolService
  ) {
    this.schoolForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      contactNo: [null, [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.schoolForm.valid) {
      this.dialogRef.close(this.schoolForm.value);
      this.schoolService.addSchool(this.schoolForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
