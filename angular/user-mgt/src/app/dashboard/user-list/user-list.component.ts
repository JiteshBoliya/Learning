import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../user-form/user-form.component';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/service/user.service';

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

  openAddUserDialog() {
    this.dialog.open(AddUserComponent, {
      width: '1000px'
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.userList.update(values => {
          return [...values, res];
        });
      }
    })
  }

  openUpdateUserDialog(data: any) {
    this.dialog.open(AddUserComponent, {
      width: '1000px'
      , data
    }).afterClosed().subscribe((res) => {
      if (res) {
        console.log('callled', res);

      }
    })
  }

  deleteUser(id: string) {
    if (confirm("Sure you want to delete..?")) {
      this.userService.deleteItem(id).subscribe((res) => {
        console.log("deleted", res);

      })
    }
  }

}
