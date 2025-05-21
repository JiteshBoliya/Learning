import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbar, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  adminData: any;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    this.adminData = this.authService.decodeToken(token ?? '');
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
