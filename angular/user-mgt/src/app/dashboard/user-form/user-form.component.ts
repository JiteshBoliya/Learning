import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../core/service/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(this.data ? this.data.name : '', [Validators.required]),
      contactNo: new FormControl(this.data ? this.data.contactNo : '', [Validators.required]),
      email: new FormControl(this.data ? this.data.email : '', [Validators.required]),
    });

  }

  onSubmit() {
    if (this.userForm.valid) {
      if (this.data) {
        this.userService.updateItem(this.data.id, this.userForm.value).subscribe((res) => {
          this.dialogRef.close(res);
        });
      } else {
        this.userService.addItem(this.userForm.value).subscribe((res) => {
          this.dialogRef.close(res);
        })
      }
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
