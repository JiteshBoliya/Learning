import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router) { }
  onSubmit() {
    // If user is admin then
    this.router.navigate(['school']);

    // If user is school then
    // this.router.navigate(['school']);
  }
}
