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
import { UtilityService } from '../../core/service/utility.service';
import { UserDetailsComponent } from "../user-details/user-details.component";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    MatIconModule,
    MatButtonModule,
    UserDetailsComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  userList = signal<User[]>([]);
  selectedUser = signal<User | any>(null);

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private utilityService: UtilityService
  ) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.userList.set(res)
      },
      error: (err) => {
        console.error('Failed to load data', err.message);
        this.utilityService.openSnackBar(err.message, 'error');
      }
    });
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
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.utilityService.openSnackBar("User data deleted", 'success');
        },
        error: (err) => {
          console.error('Failed to delete User:', err.message);
          this.utilityService.openSnackBar(err.message, 'error');
        }
      });
    }
  }

  onSelect(user: any) {
    this.selectedUser.set(user);
  }

}
