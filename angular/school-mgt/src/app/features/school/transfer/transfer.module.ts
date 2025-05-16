import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRequestComponent } from './add-request/add-request.component';
import { IncomingRequestListComponent } from './incoming-request-list/incoming-request-list.component';
import { RequestListComponent } from './request-list/request-list.component';
import { TransferRoutingModule } from './transfer.routes';
import { TransferComponent } from './transfer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    TransferComponent,
    AddRequestComponent,
    IncomingRequestListComponent,
    RequestListComponent
  ],
  imports: [
    CommonModule,
    TransferRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ], exports: [
    AddRequestComponent
  ]
})
export class TransferModule { }
