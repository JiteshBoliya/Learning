import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferModule } from './transfer/transfer.module';
import { AddDivComponent } from './add-div/add-div.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentListComponent } from './student-list/student-list.component';
import { SchoolRoutingModule } from './school.routes';



@NgModule({
  declarations: [
    AddDivComponent,
    AddStudentComponent,
    StudentDetailsComponent,
    StudentListComponent
  ],
  imports: [
    CommonModule,
    TransferModule,
    SchoolRoutingModule
  ]
})
export class SchoolModule { }
