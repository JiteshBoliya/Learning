import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudentListComponent } from "./student-list/student-list.component";
import { SchoolComponent } from "./school.component";

const routes: Routes = [
      {
            path: '',
            redirectTo: 'school',
            pathMatch: 'full'
      },
      { path: 'school', component: SchoolComponent },
      { path: 'student-list', component: StudentListComponent },
      {
            path: 'transfer',
            loadChildren: () => import('./transfer/transfer.module').then(m => m.TransferModule)
      },
];

@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
})
export class SchoolRoutingModule { }