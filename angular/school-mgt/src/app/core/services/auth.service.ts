import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { authData } from '../data/demoData';
import { type Auth } from '../models/data.model';

@Injectable({
      providedIn: 'root'
})
export class AuthService {
      private authList = signal<Auth[]>(authData);
      constructor(private router: Router) { }
      isLoggedIn = false;

      isAuthenticated(): boolean {
            return this.isLoggedIn;
      }

      login(loginData: Auth) {
            try {
                  const { username, password } = loginData;
                  const result = this.authList().find((dl: Auth) =>
                        dl.username === username
                        && dl.password === password);

                  if (result) {
                        this.isLoggedIn = true;

                        localStorage.setItem('username', username);
                        localStorage.setItem('role', result.role ? result.role : '');
                        localStorage.setItem('loginId', result.loginId ? result.loginId : '');

                        result.role === "admin" ?
                              this.router.navigate(['admin']) :
                              this.router.navigate(['school']);
                  }
                  return null;
            } catch (error) {
                  console.error({ error });
                  return null;
            }
      }

      logout() {
            try {
                  this.isLoggedIn = false;
                  localStorage.clear();
                  this.router.navigate(['auth']);
            } catch (error) {
                  console.error({ error });
            }
      }

      register(loginData: Auth, role: string) {
            try {
                  const loginId = 'L' + (this.authList().length + 1);
                  const newData = { loginId, ...loginData, role };
                  this.authList.update(values => {
                        return [...values, newData];
                  });
                  return newData;
            } catch (error) {
                  console.error({ error });
                  return null;
            }
      }


}