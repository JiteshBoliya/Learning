import { Component, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NavbarComponent, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  userList = signal<any[]>([
    { id: 'u1', name: 'jitesh', mobileNo: '9876543210', email: 'jitesh@gmail.com' }
  ]);

  constructor(private dialog: MatDialog) { }

  openAddStudentDialog() {
    const studentDialogRef = this.dialog.open(AddUserComponent, {
      width: '1000px'
    })
  }

}
