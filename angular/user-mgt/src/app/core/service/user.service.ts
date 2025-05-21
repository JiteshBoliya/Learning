import { inject, Injectable, signal } from '@angular/core';
import { collection, collectionData, Firestore, orderBy, query } from '@angular/fire/firestore';
import { catchError, finalize, from, map, Observable, tap, throwError } from 'rxjs';
import { addDoc, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { User } from '../models/data.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from './loader.service';

@Injectable({
      providedIn: 'root'
})
export class UserService {
      private firestore: Firestore = inject(Firestore);
      private userRef = collection(this.firestore, 'user');

      constructor(private loaderService: LoaderService) { }

      addUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Observable<any> {
            this.loaderService.showLoader();
            const newUser = {
                  ...user,
                  createdAt: serverTimestamp(),
                  updatedAt: serverTimestamp()
            };
            return from(addDoc(this.userRef, newUser)).pipe(
                  map(docRef => docRef),
                  catchError(error => {
                        this.loaderService.hideLoader();
                        return throwError(() => error);
                  }),
                  finalize(() => {
                        this.loaderService.hideLoader();
                  })
            );
      }

      getUsers(): Observable<User[]> {
            this.loaderService.showLoader();
            const userQuery = query(this.userRef, orderBy('createdAt', 'desc'));
            return collectionData(userQuery, { idField: 'id' }).pipe(
                  map(users => users as any[]),
                  tap(() => {
                        this.loaderService.hideLoader();
                  }),
                  catchError(error => {
                        this.loaderService.hideLoader();
                        return throwError(() => error);
                  })
            );
      }

      updateUser(id: string, user: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Observable<void> {
            this.loaderService.showLoader();
            const userDoc = doc(this.firestore, `user/${id}`);
            const updatedData = {
                  ...user,
                  updatedAt: serverTimestamp()
            };

            return from(updateDoc(userDoc, updatedData)).pipe(
                  map(docRef => docRef),
                  catchError(error => {
                        this.loaderService.hideLoader();
                        return throwError(() => error);
                  }),
                  finalize(() => {
                        this.loaderService.hideLoader();
                  })
            );
      }

      deleteUser(id: string): Observable<void> {
            this.loaderService.showLoader();
            const userDoc = doc(this.firestore, `user/${id}`);
            return from(deleteDoc(userDoc)).pipe(
                  map(docRef => docRef),
                  catchError(error => {
                        this.loaderService.hideLoader();
                        return throwError(() => error);
                  }),
                  finalize(() => {
                        this.loaderService.hideLoader();
                  })
            );
      }

}