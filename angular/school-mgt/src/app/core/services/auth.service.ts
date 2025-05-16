import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
      providedIn: 'root'
})
export class AuthService {
      private demoLoginData = [
            {
                  id: 'l1',
                  username: "admin",
                  password: "pass",
                  role: "admin"
            },
            {
                  id: 'l2',
                  username: "school",
                  password: "pass",
                  role: "school"
            },
      ]

      constructor(private router: Router, private localStorage: LocalStorageService) { }

      login(loginData: Login) {
            try {
                  const { username, password } = loginData;
                  const result = this.demoLoginData.find((dl) =>
                        dl.username === username
                        && dl.password === password);

                  if (result) {
                        this.localStorage.setItem([
                              { key: 'username', value: username },
                              { key: 'role', value: result.role },
                              { key: 'id', value: result.id }
                        ])
                        if (result.role === "admin") {
                              this.router.navigate(['admin']);
                        } else {
                              this.router.navigate(['school']);
                        }
                  }
                  return null;
            } catch (error) {
                  console.error({ error });
                  return null;
            }
      }

      logout() {
            try {
                  this.localStorage.clearAll();
                  this.router.navigate(['auth']);
            } catch (error) {
                  console.error({ error });
            }
      }

      register(loginData: Login, role: string) {
            try {
                  const id = 'l' + this.demoLoginData.length + 1;
                  this.demoLoginData.push({ id, ...loginData, role });
                  return { id, ...loginData, role };
            } catch (error) {
                  console.error({ error });
                  return null;
            }
      }


}