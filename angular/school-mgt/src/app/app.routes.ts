import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
export const routes: Routes = [
      {
            path: '',
            redirectTo: 'auth/login',
            pathMatch: 'full'
      },
      {
            path: 'auth',
            loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
      },
      {
            path: 'admin',
            loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
      },
      {
            path: 'school',
            loadChildren: () => import('./features/school/school.module').then(m => m.SchoolModule)
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
