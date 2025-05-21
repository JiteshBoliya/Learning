import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/user-list']);
    }

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

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
