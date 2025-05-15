import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  username = '';
  role = '';

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.username = '' + localStorage.getItem('username');
    this.role = '' + localStorage.getItem('role');

    if (!this.username) this.logout();
  }

  logout() {
    this.router.navigate(['auth']);
    localStorage.clear();
  }
}
