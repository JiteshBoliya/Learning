import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/service/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [NavbarComponent, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  userList = signal<any[]>([]);

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getItems().subscribe((res) => {
      this.userList.set(res)
    })
  }

  openAddStudentDialog() {
    const studentDialogRef = this.dialog.open(AddUserComponent, {
      width: '1000px'
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.userList.update(values => {
          return [...values, res];
        });
      }
    })
  }

}
