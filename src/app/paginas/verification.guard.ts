import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class verificationGuard implements CanActivate {
  constructor(private firebaseAuth: AngularFireAuth,
    private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.firebaseAuth
      .authState
      .pipe(
        map(user => {
          if (user) {
            return true;
          } else {
            console.log("Acesso negado! Realize o login")
            this.router.navigate(["login"])
            return false;
          }
        })
      )
  }

}
