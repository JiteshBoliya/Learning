import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRequestComponent } from './add-request/add-request.component';
import { IncomingRequestListComponent } from './incoming-request-list/incoming-request-list.component';
import { RequestListComponent } from './request-list/request-list.component';
import { TransferRoutingModule } from './transfer.routes';



@NgModule({
  declarations: [
    AddRequestComponent,
    IncomingRequestListComponent,
    RequestListComponent
  ],
  imports: [
    CommonModule,
    TransferRoutingModule
  ]
})
export class TransferModule { }
