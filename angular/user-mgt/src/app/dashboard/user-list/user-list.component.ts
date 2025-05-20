import { Component, inject, OnInit, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from '../user-form/user-form.component';
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
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

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
    }).afterClosed().subscribe((res) => {
      if (res) {

        // this.userList.update(values => {
        //   return [...values, res];
        // });
        this.openSnackBar("User data Added", "Ok");
      }
    })
  }

  openUpdateUserDialog(data: any) {
    this.dialog.open(UserFormComponent, {
      width: '1000px'
      , data
    }).afterClosed().subscribe((res) => {
      if (res) {
        this.openSnackBar("User data updated", "Ok");
      }
    })
  }

  deleteUser(id: string) {
    if (confirm("Sure you want to delete..?")) {
      this.userService.deleteUser(id).subscribe((res) => {
        this.openSnackBar("User data deleted", "Ok");
      })
    }
  }

}
