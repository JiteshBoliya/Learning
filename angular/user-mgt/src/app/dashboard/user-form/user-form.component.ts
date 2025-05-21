import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../core/service/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../core/models/data.model';
import { CommonModule } from '@angular/common';
import { UtilityService } from '../../core/service/utility.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<UserFormComponent>,
    private userService: UserService,
    private utilityService: UtilityService,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl(this.data ? this.data.name : '', [Validators.required, Validators.minLength(2),]),
      contactNo: new FormControl(this.data ? this.data.contactNo : '', [Validators.required, Validators.pattern("^[0-9]{10}$")]),
      email: new FormControl(this.data ? this.data.email : '', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.valid) {
      if (this.data) {
        this.userService.updateUser(this.data.id, this.userForm.value).subscribe({
          next: () => {
            this.utilityService.openSnackBar("User data updated", "success");
          },
          error: (err) => {
            console.error('Failed to update User:', err.message);
            this.utilityService.openSnackBar(err.message, 'error');
          }
        });
      } else {
        this.userService.addUser(this.userForm.value).subscribe({
          next: () => {
            this.utilityService.openSnackBar("User data Added", "success");
          },
          error: (err) => {
            console.error('Failed to add User:', err.message);
            this.utilityService.openSnackBar(err.message, 'error');
          }
        });
      }
      this.dialogRef.close();
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  get f() { return this.userForm.controls; }
}
