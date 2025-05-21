import { inject, Injectable, signal } from '@angular/core';
import { collection, collectionData, Firestore, orderBy, query } from '@angular/fire/firestore';
import { from, map, Observable } from 'rxjs';
import { addDoc, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { User } from '../models/data.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
      providedIn: 'root'
})
export class UserService {
      private firestore: Firestore = inject(Firestore);
      private userRef = collection(this.firestore, 'user');

      addUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Observable<any> {
            const newUser = {
                  ...user,
                  createdAt: serverTimestamp(),
                  updatedAt: serverTimestamp()
            };
            return from(addDoc(this.userRef, newUser)).pipe(
                  map(docRef => docRef)
            );
      }

      getUsers(): Observable<User[]> {
            const userQuery = query(this.userRef, orderBy('createdAt', 'desc'));
            return collectionData(userQuery, { idField: 'id' }).pipe(
                  map(users => users as any[])
            );
      }

      updateUser(id: string, user: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): Observable<void> {
            const userDoc = doc(this.firestore, `user/${id}`);
            const updatedData = {
                  ...user,
                  updatedAt: serverTimestamp()
            };

            return from(updateDoc(userDoc, updatedData));
      }

      deleteUser(id: string): Observable<void> {
            const userDoc = doc(this.firestore, `user/${id}`);
            return from(deleteDoc(userDoc));
      }

}