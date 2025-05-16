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
                  loginId: 'l1',
                  username: "admin",
                  password: "aa",
                  role: "admin"
            },
            {
                  loginId: 'l2',
                  username: "GreenValley",
                  password: "aa",
                  role: "school"
            },
            {
                  loginId: 'l3',
                  username: "SunrisePublic",
                  password: "aa",
                  role: "school"
            },
            {
                  loginId: 'l4',
                  username: "Bluebird",
                  password: "aa",
                  role: "school"
            }
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
                              { key: 'loginId', value: result.loginId }
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
                  const loginId = 'L' + (this.demoLoginData.length + 1);
                  this.demoLoginData.push({ loginId, ...loginData, role });
                  return { loginId, ...loginData, role };
            } catch (error) {
                  console.error({ error });
                  return null;
            }
      }


}