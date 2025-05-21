import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { CommonModule } from '@angular/common';
import { UtilityService } from '../../core/service/utility.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/user-list']);
    }

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        // Validators.minLength(8),
        // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ])
    });
  }

  onSubmit() {
    try {
      this.submitted = true;
      if (this.loginForm.invalid) {
        return;
      }
      const loginData = this.loginForm.value;
      this.authService.login(loginData)?.subscribe({
        next: () => {
          this.loginForm.reset();
          this.utilityService.openSnackBar('Logged In successfully', 'success');
          this.router.navigate(['/user-list']);
        },
        error: (err) => {
          console.error('Login failed:', err.message);
          this.utilityService.openSnackBar(err.message, 'error');
        }
      });
    } catch (error) {
      console.log({ error });
    }
  }

  get f() { return this.loginForm.controls; }
}
