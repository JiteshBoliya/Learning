import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RequestListComponent } from "./request-list/request-list.component";
import { TransferComponent } from "./transfer.component";

const routes: Routes = [
      {
            path: '',
            redirectTo: 'transfer',
            pathMatch: 'full'
      },
      { path: 'transfer', component: TransferComponent },
      { path: 'transfer-list', component: RequestListComponent },
];

@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
})
export class TransferRoutingModule { }