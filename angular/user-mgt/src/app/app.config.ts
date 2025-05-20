import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDbstpDDbMQuIxCbiwmQZtFR4jMhVbh6Mc",
  authDomain: "milkcollectiondb.firebaseapp.com",
  projectId: "milkcollectiondb",
  storageBucket: "milkcollectiondb.firebasestorage.app",
  messagingSenderId: "955290780775",
  appId: "1:955290780775:web:9173ecc939fa35424080c2",
  measurementId: "G-5VZC14TKYR"
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideFirebaseApp(() => initializeApp(firebaseConfig)),
  provideFirestore(() => getFirestore()),]
};
