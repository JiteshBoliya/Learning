import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore, getDocs, orderBy, query, where } from '@angular/fire/firestore';
import { from, map, of, switchMap, throwError } from 'rxjs';
import { Admin } from '../models/data.model';
import * as CryptoJS from 'crypto-js';
import { addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private firestore: Firestore = inject(Firestore);
  private adminRef = collection(this.firestore, 'login');

  login(loginData: any) {
    try {
      const { username, password } = loginData;
      const q = query(this.adminRef, where('username', '==', username));

      return from(getDocs(q)).pipe(
        switchMap(querySnapshot => {
          // Check if user exists
          if (querySnapshot.empty) {
            return throwError(() => new Error('User not found'));
          }

          // Get the first matching user
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data() as Admin;
          userData.id = userDoc.id;

          // Verify the password
          const isMatch = this.comparePasswords(password, userData.password);

          if (isMatch) {
            return of(userData);
          } else {
            // Password is incorrect
            return throwError(() => new Error('Invalid password'));
          }
        })
      )
    } catch (error) {
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
}
