import { Component, inject, OnInit, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/service/user.service';
import { User } from '../../core/models/data.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  userList = signal<User[]>([]);

  constructor(
    private dialog: MatDialog,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      this.userList.set(res)
    })
  }

  openAddUserDialog() {
    this.dialog.open(UserFormComponent, {
      width: '1000px'
    })
  }

  openUpdateUserDialog(data: any) {
    this.dialog.open(UserFormComponent, {
      width: '1000px'
      , data
    });
  }

  deleteUser(id: string) {
    if (confirm("Sure you want to delete..?")) {
      this.userService.deleteUser(id);
      this.userService.openSnackBar("User data deleted", "Ok");
    }
  }

}
