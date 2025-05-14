import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StudentListComponent } from "./student-list/student-list.component";
import { AddDivComponent } from "./add-div/add-div.component";
import { AddStudentComponent } from "./add-student/add-student.component";
import { StudentDetailsComponent } from "./student-details/student-details.component";

const routes: Routes = [
      {
            path: '',
            redirectTo: 'student-list',
            pathMatch: 'full'
      },
      { path: 'student-list', component: StudentListComponent },
      // { path: 'add-div', component: AddDivComponent },
      // { path: 'add-student', component: AddStudentComponent },
      { path: 'student-detail', component: StudentDetailsComponent },
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