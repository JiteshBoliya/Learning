import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  role: string | null = '';
  username: string | null = '';

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    const userData = this.authService.getUserInfo();
    if (userData) {
      this.role = userData.roles;
      this.username = userData?.username;
    }
  }

  logout() {
    try {
      this.authService.logout();
    } catch (error) {
      console.error({ error });
    }
  }
}
