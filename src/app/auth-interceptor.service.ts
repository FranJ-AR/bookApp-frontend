import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { User } from './User';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private userAuthService: UserAuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.userAuthService.userSubject.pipe(take(1), exhaustMap((user: User | null) => {

      let newReq: HttpRequest<any> | undefined;

      if (!!user) { // if there is user logged AND the token has not expired yet

        let token: string | null = user.token;

        if (!token) {

          return next.handle(req); // if token has expired, end 

        } 

        newReq = req.clone({

          headers: req.headers.set('Authorization', 'Bearer ' + token)
            .append('Access-Control-Allow-Origin', '*')

        });

      } else { // if not logged

        return next.handle(req);

      }

      //if(this.userAuthService

      return next.handle(newReq);

    }));
  }

}
