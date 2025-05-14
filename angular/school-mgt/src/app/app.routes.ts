import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
      {
            path: '',
            redirectTo: 'auth/login',
            pathMatch: 'full'
      },
      {
            path: 'auth',
            loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
            path: 'admin',
            loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      },
      {
            path: 'school',
            loadChildren: () => import('./school/school.module').then(m => m.SchoolModule)
      },
      {
            path: '**',
            component: PageNotFoundComponent
      }
];

@NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule]
})
export class AppRoutingModule { }
