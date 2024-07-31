import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { GoogleAuthProvider } from 'firebase/auth';
import { catchError, EMPTY, from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  public autenticarGoogle(): Observable<any> {
    const googleAuth = new GoogleAuthProvider();
    const promessa = this.auth.signInWithPopup(googleAuth);
    return from(promessa).pipe(
      catchError(error => {
        console.log("erro ao logar");
        return EMPTY;
      })
    )
  }

  public sair() {
    const promessa = this.auth.signOut()
    return from(promessa)
  }

}
