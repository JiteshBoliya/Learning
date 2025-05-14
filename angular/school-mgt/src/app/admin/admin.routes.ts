import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SchoolListComponent } from "./school-list/school-list.component";
import { AddSchoolComponent } from "./add-school/add-school.component";

const routes: Routes = [
      {
            path: '',
            redirectTo: 'school-list',
            pathMatch: 'full'
      },
      { path: 'school-list', component: SchoolListComponent },
      { path: 'add-school', component: AddSchoolComponent }
];

@NgModule({
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
})
export class AdminRoutingModule { }