import { Component, Inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SchoolService } from '../../../../core/services/school.service';
import { TransferService } from '../../../../core/services/transfer.service';
import { School, Student } from '../../../../core/models/data.model';

@Component({
  selector: 'app-add-request',
  standalone: false,
  templateUrl: './add-request.component.html',
  styleUrl: './add-request.component.scss'
})
export class AddRequestComponent {
  transferRequestForm!: FormGroup;
  schoolList = signal<School[]>([]);

  constructor(
    private dialogRef: MatDialogRef<AddRequestComponent>,
    private fb: FormBuilder,
    private schoolService: SchoolService,
    private transferService: TransferService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.schoolList.set(this.schoolService.getSchoolListForTransfer(this.data));

    this.transferRequestForm = this.fb.group({
      name: ['', [Validators.required]],
      school: ['', [Validators.required]]
    });
    this.transferRequestForm.controls['name'].patchValue(this.data.name);
    this.transferRequestForm.controls['name'].disable();
  }

  onSubmit() {
    const resultData = this.transferService.addTransferRequest({
      studentId: this.data.studentId,
      name: this.data.name,
      currentSchoolId: this.data.schoolId,
      transferSchoolId: this.transferRequestForm.value['school']
    });
    this.dialogRef.close(resultData);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
