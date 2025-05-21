import { Component, input, output } from '@angular/core';
import { User } from '../../core/models/data.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  selectedUser = input<User>();
  deleteUser = output<string>();

  onDelete(id: string) {
    this.deleteUser.emit(id);
  }
}
