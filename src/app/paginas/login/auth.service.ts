import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
import { catchError, EMPTY, from, Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) { }

  public autenticarEmailSenha(user: User): Observable<any> {
    const promessa = this.auth.signInWithEmailAndPassword(user.email, user.password)
    return from(promessa).pipe(
      catchError(error => {
        if(error.code == "auth/user-not-found"){
          console.log("Usuario não cadastrado.")
          }else if (error.code == "auth/wrong-password") {
            console.log("Senha incorreta.")
            console.error(error)
          } else if (error.code == "auth/invalid-email") {
          console.log("Email incorreto.")
            console.error(error)
          } else {
            console.log("Error ao autenticar.")
            console.error(error)
          }
          return EMPTY;
      })
    )
    

    
  }

  public sair() {
    const promessa = this.auth.signOut()
    return from(promessa)
  }

  

}
