import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSchoolComponent } from './add-school/add-school.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { AdminRoutingModule } from './admin.routes';



@NgModule({
  declarations: [
    AddSchoolComponent,
    SchoolListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
