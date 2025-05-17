import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransferService } from '../../../core/services/transfer.service';
import { StudentService } from '../../../core/services/student.service';

@Component({
  selector: 'app-student-details',
  standalone: false,
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss'
})
export class StudentDetailsComponent implements OnInit {
  studentDetail: any;
  constructor(
    private dialogRef: MatDialogRef<StudentDetailsComponent>,
    private studentService: StudentService,
    private transferService: TransferService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  async ngOnInit(): Promise<void> {
    const studentData = await this.studentService.getStudent(this.data.studentId);
    const transferLogs = await this.transferService.getTransferLogs(this.data.studentId);
    this.studentDetail = { ...studentData, transferLogs };

    console.log("-------------------", this.studentDetail);

  }

  onCancel() {
    this.dialogRef.close();
  }
}
