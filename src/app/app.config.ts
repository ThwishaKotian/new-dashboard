import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAbyhffqzSW62aoW3bQwMBpKFnOoz8-_yo",
  authDomain: "dashboard-a50aa.firebaseapp.com",
  projectId: "dashboard-a50aa",
  storageBucket: "dashboard-a50aa.appspot.com",
  messagingSenderId: "663320387371",
  appId: "1:663320387371:web:fcb57b48624dce4486ef6e",
  measurementId: "G-7LSNVQG41L"
};


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
  importProvidersFrom([
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ])]
};
