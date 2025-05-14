import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RequestListComponent } from "./request-list/request-list.component";
import { IncomingRequestListComponent } from "./incoming-request-list/incoming-request-list.component";
import { AddRequestComponent } from "./add-request/add-request.component";

const routes: Routes = [
      { path: 'request-list', component: RequestListComponent },
      { path: 'incoming-request-list', component: IncomingRequestListComponent },
      { path: 'add - request', component: AddRequestComponent }
];

@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
})
export class TransferRoutingModule { }