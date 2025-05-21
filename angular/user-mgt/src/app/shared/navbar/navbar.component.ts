import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { MatIcon } from '@angular/material/icon';
import { UtilityService } from '../../core/service/utility.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbar, MatButtonModule, MatIcon],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  adminData: any;
  constructor(
    private authService: AuthService,
    private utilityService: UtilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = this.authService.getToken();
    this.adminData = this.authService.decodeToken(token ?? '');
  }

  logout() {
    this.authService.logout();
    this.utilityService.openSnackBar('Logout Successfully', 'success');
    this.router.navigate(['/']);
  }
}
