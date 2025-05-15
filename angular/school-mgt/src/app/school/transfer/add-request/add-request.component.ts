import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-request',
  standalone: false,
  templateUrl: './add-request.component.html',
  styleUrl: './add-request.component.scss'
})
export class AddRequestComponent {
  constructor(private dialogRef: MatDialogRef<AddRequestComponent>,) { }
  onCancel() {
    this.dialogRef.close();
  }
}
