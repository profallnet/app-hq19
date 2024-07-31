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

const app = initializeApp(firebaseConfig);



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), 
    provideFirebaseApp(() => initializeApp({"projectId":"app-aula-50294","appId":"1:682932608702:web:8d9f9ff9aac6529cc608ef","storageBucket":"app-aula-50294.appspot.com","apiKey":"AIzaSyAiH_lkocK4QdHzfgXclOPir3iUWaEiRt0","authDomain":"app-aula-50294.firebaseapp.com","messagingSenderId":"682932608702","measurementId":"G-FN9NK0FXM8"})), 
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