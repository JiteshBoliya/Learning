import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddSchoolComponent } from './add-school/add-school.component';
import { SchoolListComponent } from './school-list/school-list.component';
import { AdminRoutingModule } from './admin.routes';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AddSchoolComponent,
    SchoolListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
