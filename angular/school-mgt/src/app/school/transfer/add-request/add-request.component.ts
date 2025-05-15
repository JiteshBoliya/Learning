import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-request',
  standalone: false,
  templateUrl: './add-request.component.html',
  styleUrl: './add-request.component.scss'
})
export class AddRequestComponent {
  transferRequestForm!: FormGroup;
  constructor(private dialogRef: MatDialogRef<AddRequestComponent>, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.transferRequestForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      school: ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log('------------', this.transferRequestForm.value);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
