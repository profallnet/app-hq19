import { ApplicationConfig, provideZoneChangeDetection , importProvidersFrom } from '@angular/core';
import { provideRouter , withHashLocation} from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCTKjtaIHupW_hCQOuFenFZ77eRV_QnCwI",
  authDomain: "app-hq19.firebaseapp.com",
  projectId: "app-hq19",
  storageBucket: "app-hq19.appspot.com",
  messagingSenderId: "202471308505",
  appId: "1:202471308505:web:178a57441d400554c992c8",
  measurementId: "G-YBC9457LJB"
};

// const app = initializeApp(firebaseConfig);



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({"projectId":"app-hq19",
      "appId":"1:202471308505:web:178a57441d400554c992c8",
      "storageBucket":"app-hq19.appspot.com",
      "apiKey":"IzaSyCTKjtaIHupW_hCQOuFenFZ77eRV_QnCwI",
      "authDomain":"app-hq19.firebaseapp.com",
      "messagingSenderId":"202471308505",
      "measurementId":"G-YBC9457LJB"})), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore()),
    //a partir dessa linha inserido por mim
    provideRouter(routes, withHashLocation()),
    importProvidersFrom(
      HttpClientModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule
    )
  ]
};