import { inject, Injectable, signal } from '@angular/core';
import { collection, collectionData, Firestore, getDocs, orderBy, query, where } from '@angular/fire/firestore';
import { from, map, Observable, of, switchMap, throwError } from 'rxjs';
import { addDoc, serverTimestamp } from 'firebase/firestore';
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

}