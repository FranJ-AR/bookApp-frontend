import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { User } from './User';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})

/* Redirected routes such as login and register, so the user cannot access
   when the user is already logged */

export class AuthNotLogged implements CanActivate {

  constructor(private userAuthService: UserAuthService, private router: Router) {


  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.userAuthService.userSubject.pipe(take(1), map((user: User | null) => {

      if ((!user)) { // user logged

        return this.router.createUrlTree(['/index']);

      }

      else { // user not logged

        return true;

      }

    }))



  }



}

