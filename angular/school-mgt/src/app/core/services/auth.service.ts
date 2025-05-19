import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { authData } from '../data/demoData';
import { type Auth } from '../models/data.model';
interface DecodedToken {
      loginId: string;
      username: string;
      roles: string;
      exp: number;
}
@Injectable({
      providedIn: 'root'
})

export class AuthService {
      private authList = signal<Auth[]>(authData);
      private readonly TOKEN_KEY = 'auth_token';
      isLoggedIn = false;

      constructor(private router: Router) { }

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
                        const token = this.generateToken({ loginId: result.loginId, roles: result.role, username });
                        this.storeToken(token);


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

      private generateToken(user: any): string {
            const tokenData: DecodedToken = {
                  loginId: user.loginId,
                  username: user.username,
                  roles: user.roles,
                  exp: Math.floor(Date.now() / 1000) + 3600
            };
            return btoa(JSON.stringify(tokenData));
      }

      private storeToken(token: string): void {
            localStorage.setItem(this.TOKEN_KEY, token);
      }

      private getToken(): string | null {
            return localStorage.getItem(this.TOKEN_KEY);
      }

      private isTokenValid(): boolean {
            const token = this.getToken();

            if (!token) {
                  return false;
            }
            try {
                  const decodedToken = this.decodeToken(token);
                  return decodedToken.exp * 1000 > Date.now();
            } catch (error) {
                  console.error('Token validation error', error);
                  return false;
            }
      }

      private decodeToken(token = this.getToken()): DecodedToken {
            if (!token) {
                  throw new Error('No token found');
            }

            try {
                  return JSON.parse(atob(token));
            } catch (error) {
                  console.error('Token decoding failed', error);
                  throw new Error('Invalid token format');
            }
      }

      getUserInfo() {
            try {
                  return this.decodeToken();
            } catch {
                  return null;
            }
      }

      hasRole(role: string): boolean {
            try {

                  const decodedToken = this.decodeToken();
                  return decodedToken.roles?.includes(role) || false;
            } catch {
                  return false;
            }
      }
}