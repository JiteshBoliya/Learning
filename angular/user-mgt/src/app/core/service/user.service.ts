import { inject, Injectable, signal } from '@angular/core';
import { collection, collectionData, Firestore, getDocs, orderBy, query, where } from '@angular/fire/firestore';
import { from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { addDoc, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { User } from '../models/data.model';

@Injectable({
      providedIn: 'root'
})
export class UserService {
      private firestore: Firestore = inject(Firestore);
      private userRef = collection(this.firestore, 'user');
      userCollection: any = [];

      addItem(item: Omit<any, 'id' | 'createdAt' | 'updatedAt'>): Observable<any> {
            const newUser = {
                  ...item,
                  id: this.userCollection.length + 1,
                  createdAt: serverTimestamp(),
                  updatedAt: serverTimestamp()
            };

            this.userCollection.push(newUser);

            return from(addDoc(this.userRef, newUser)).pipe(
                  map(docRef => docRef)
            );
      }

      getItems(): Observable<any[]> {
            const userQuery = query(this.userRef, orderBy('createdAt', 'desc'));
            return collectionData(userQuery, { idField: 'id' }).pipe(
                  map(users => users as any[])
            );
      }

      // Update an existing item
      updateItem(id: string, user: Partial<Omit<any, 'id' | 'createdAt' | 'updatedAt'>>): Observable<void> {
            const userDoc = doc(this.firestore, `user/${id}`);
            const updatedData = {
                  ...user,
                  updatedAt: serverTimestamp()
            };

            return from(updateDoc(userDoc, updatedData));
      }

      // Delete an item
      deleteItem(id: string): Observable<void> {
            const userDoc = doc(this.firestore, `user/${id}`);
            return from(deleteDoc(userDoc));
      }

}