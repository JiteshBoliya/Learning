import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  role: string | null = '';
  username: string | null = '';

  constructor(private localStorageService: LocalStorageService, private authService: AuthService) { }
  ngOnInit(): void {
    this.role = this.localStorageService.getItem('role');
    this.username = this.localStorageService.getItem('username');
  }

  logout() {
    try {
      this.authService.logout();
    } catch (error) {
      console.error({ error });
    }
  }
}
