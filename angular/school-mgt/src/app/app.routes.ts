import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { authGuard } from './core/guard/auth.guard';
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
            loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
            canActivate: [authGuard]
      },
      {
            path: 'school',
            loadChildren: () => import('./features/school/school.module').then(m => m.SchoolModule),
            canActivate: [authGuard]
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
