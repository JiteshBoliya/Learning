import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentListComponent } from './student-list/student-list.component';
import { MaterialModule } from '../material.module';
import { TransferModule } from './transfer/transfer.module';
import { SchoolRoutingModule } from './school.routes';
import { SharedModule } from '../shared/shared.module';
import { SchoolComponent } from './school.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SchoolComponent,
    AddStudentComponent,
    StudentDetailsComponent,
    StudentListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TransferModule,
    SchoolRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SchoolModule { }
