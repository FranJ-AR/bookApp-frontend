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

    if(!!user){ // if there is user logged AND the token has not expired yet

      console.log("intercepted logged");

      let token:string|null = user.token;

      if(!!token) {
        
        return next.handle(req); 
      
      } // if token has expired, end 

      let newReq:HttpRequest<any> = req.clone({

        headers: req.headers.set('Authorization','Bearer '+token)
        .append('Access-Control-Allow-Origin', '*')

      });


    }else{ // if not logged

      console.log("intercepted not logged");


    }

    //if(this.userAuthService
    
    return next.handle(req);

    }));
  }
  
}
