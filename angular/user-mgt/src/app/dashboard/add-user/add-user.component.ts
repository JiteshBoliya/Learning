import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../core/service/user.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      contactNo: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
    })
  }

  onAdd() {
    if (this.userForm.valid) {
      this.userService.addItem(this.userForm.value).subscribe((res) => {
        this.dialogRef.close(res);
      })
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
