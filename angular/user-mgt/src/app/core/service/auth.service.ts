import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore, getDocs, orderBy, query, where } from '@angular/fire/firestore';
import { from, map, of, switchMap, throwError } from 'rxjs';
import { Admin } from '../models/data.model';
import * as CryptoJS from 'crypto-js';
import { addDoc } from 'firebase/firestore';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';
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
  private firestore: Firestore = inject(Firestore);
  private adminRef = collection(this.firestore, 'login');
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private loaderService: LoaderService) { }

  isAuthenticated(): boolean {
    return this.isTokenValid();
  }

  login(loginData: any) {
    try {
      this.loaderService.showLoader();
      const { username, password } = loginData;
      const q = query(this.adminRef, where('username', '==', username));

      return from(getDocs(q)).pipe(
        switchMap(querySnapshot => {
          // Check if user exists
          if (querySnapshot.empty) {
            this.loaderService.hideLoader();
            return throwError(() => new Error('User not found'));
          }

          // Get the first matching user
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data() as Admin;
          userData.id = userDoc.id;

          // Verify the password
          const isMatch = this.comparePasswords(password, userData.password);

          if (isMatch) {
            const token = this.generateToken({ loginId: userData.id, username });
            this.storeToken(token);
            this.loaderService.hideLoader();
            return of(userData);
          } else {
            this.loaderService.hideLoader();
            return throwError(() => new Error('Invalid password'));
          }
        })
      )
    } catch (error) {
      console.log('called');
      console.error({ error });
      return null;
    }
  }

  register(loginData: any) {

    const { username, password } = loginData;
    const newAdmin = {
      username,
      password: this.hashPassword(password)
    };

    return from(addDoc(this.adminRef, newAdmin));
    ;
  }

  logout() {
    localStorage.clear();
  }

  private comparePasswords(plainPassword: string, hashedPassword: string): boolean {
    const salt = hashedPassword.split(':')[0];
    const hash = this.hashPassword(plainPassword, salt);
    return hash === hashedPassword;
  }

  private hashPassword(password: string, existingSalt?: string): string {
    const salt = existingSalt || CryptoJS.lib.WordArray.random(16).toString();
    const hash = CryptoJS.SHA256(salt + password).toString();
    return `${salt}:${hash}`;
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

  getToken() {
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

  decodeToken(token: string): DecodedToken {
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
}
