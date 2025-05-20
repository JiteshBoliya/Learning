import { Component, inject, OnInit } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  // private _snackBar = inject(MatSnackBar);
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  onSubmit() {
    try {
      if (this.loginForm.invalid) {
        return;
      }
      const loginData = this.loginForm.value;
      this.authService.login(loginData)?.subscribe((res) => {
        this.loginForm.reset();
        this.router.navigate(['/user-list']);
      });
    } catch (error) {
      console.error({ error });
    }
  }
}
