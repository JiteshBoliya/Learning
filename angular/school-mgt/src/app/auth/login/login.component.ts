import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const demoLoginData = [
  {
    username: "admin",
    password: "password",
    role: "admin"
  },
  {
    username: "school",
    password: "password",
    role: "school"
  },
]
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;
    const result = demoLoginData.find((dl) => dl.username === loginData.username && dl.password === loginData.password);

    if (!result) {
      this.loginForm.reset();
    } else {
      localStorage.setItem("username", result.role);
      localStorage.setItem("role", result.role);

      if (result.role === "admin") {
        this.router.navigate(['admin']);
      } else {
        this.router.navigate(['school']);
      }
    }
  }
}
