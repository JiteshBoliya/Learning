import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { UserListComponent } from './dashboard/user-list/user-list.component';
import { authGuard } from './core/guard/auth.guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';

export const routes: Routes = [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'user-list', component: UserListComponent, canActivate: [authGuard] },
      { path: '**', component: PageNotFoundComponent }
];
