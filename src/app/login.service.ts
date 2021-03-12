import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginResponse } from './LoginResponse'
import { catchError, exhaustMap, take, tap } from 'rxjs/operators';
import { User } from './User';
import { UserAuthService } from './user-auth.service';

interface StoredUserDetails{

  username: string;
  token: string;
  expirationDate: string;


}

@Injectable({
  providedIn: 'root'
})

// We are going to simulate the login from an external API

export class LoginService {

  userNameFake: string = "test";
  passwordFake: string = "1234";
  tokenFake: string = "test@token";

  private KEY_USER_SESSION_STORAGE = "user-details";

  private loginUrl = "http://localhost:8080/login";

  constructor(private http: HttpClient, private userAuthService: UserAuthService) { }

  login(username: string, password: string): Observable<LoginResponse> {

    return this.http.post<LoginResponse>
      (this.loginUrl, { username: username, password: password }).pipe(
        catchError((error) => {

          console.log(error);
          console.log(error.error.errorMessage);
          throw this.setErrorMessage(error) // rethrows the error, sends a human 
          // readable description of the error to the user
        }),

        tap((loginResponse: LoginResponse) => {

          let user: User = new User(username, password, loginResponse.token,
            new Date(loginResponse.tokenExpirationTime));
          this.storeUserDetails(user);
          this.userAuthService.userSubject.next(user);
        }
        )
      )



  }

  private setErrorMessage(errorResponse: any): string {

    if (errorResponse.status === 0) {

      return "Cannot connect to server, " +
        "check Internet connection and try again, contact the administrator if the problem persists";

    }

    let genericError = "An unknown error happened, try again later"

    if (!errorResponse.error.errorMessage) {

      return genericError;
    }

    let errorMessageFromServer = errorResponse.error.errorMessage;

    let errorMessageToUser = "";

    switch (errorMessageFromServer) {

      case "Username and password must have at least 5 characters":

        errorMessageToUser = errorMessageFromServer; break;

      case "Username not found":

        errorMessageToUser = errorMessageFromServer; break;

      case "Incorrect password":

        errorMessageToUser = errorMessageFromServer; break;

      default:

        errorMessageToUser = errorMessageFromServer = genericError; break;

    }

    return errorMessageToUser;


  }

  private storeUserDetails(user: User): void {

    let storedUser: string | null = localStorage.getItem(this.KEY_USER_SESSION_STORAGE);

    if (!storedUser) { // stored user is null, so store the user

      localStorage.setItem(this.KEY_USER_SESSION_STORAGE, JSON.stringify(user));

    }


  }

  autologin():void {

    let storedUser: string | null = localStorage.getItem(this.KEY_USER_SESSION_STORAGE);

    //let userDetails:UserDetails = storedUser;

    if(! storedUser ) return; // if no stored user, end

    let storedUserDetails:StoredUserDetails = JSON.parse(storedUser);

    let user:User = new User(storedUserDetails.username, "null", 
    storedUserDetails.token, new Date(storedUserDetails.expirationDate));

    this.userAuthService.userSubject.next(user);

  }

  logout():void{

    this.userAuthService.userSubject.next(null);

    if(this.hasStoredLogin()){


      localStorage.removeItem(this.KEY_USER_SESSION_STORAGE);

    }

  }

  private hasStoredLogin():boolean{

    let userDetails:string|null = localStorage.getItem(this.KEY_USER_SESSION_STORAGE);

    if(!userDetails){

      return false;

    }

    return true;


  }


}
