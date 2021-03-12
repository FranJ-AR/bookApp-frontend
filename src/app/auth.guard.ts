import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { User } from './User';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userAuthService: UserAuthService, private router: Router) {


  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.userAuthService.user.pipe(take(1), map((user: User | null) => {

      console.log(user);

      if (user === null) {

        console.log("stay");

        return true;

      }

      else {

        console.log("redirect");

        //this.router.navigate(["/"]);

        return this.router.createUrlTree(["/private-section"]);

      }



    }))



  }



}

