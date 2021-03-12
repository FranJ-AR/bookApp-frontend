import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';
import { User } from './User';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private userAuthService:UserAuthService) { }
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.userAuthService.userSubject.pipe(take(1),exhaustMap( (user:User|null) => {

    console.log("intercepted");

    if(!!user){ // if there is user logged

      console.log("intercepted logged");


    }else{ // if not logged

      console.log("intercepted not logged");


    }

    //if(this.userAuthService
    
    return next.handle(req);

    }));
  }
  
}
