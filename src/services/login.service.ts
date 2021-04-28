import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, exhaustMap, take, tap } from 'rxjs/operators';
import { constants } from 'src/constants';
import { LoginResponse } from '../interfaces/LoginResponse';
import { User } from '../interfaces/User';
import { UserAuthService } from './user-auth.service';

interface StoredUserDetails{

  username: string;
  _token: string;
  tokenExpirationDate: string;
  _maximumBooksLoan:string;
  _maximumBooksReservation:string;

}

@Injectable({
  providedIn: 'root'
})

// We are going to simulate the login from an external API

export class LoginService {

  private KEY_USER_SESSION_STORAGE = "user-details";

  private loginUrl = constants.ROOT_CONNECTION+"login";

  private timer:any|null;

  constructor(private http: HttpClient, private userAuthService: UserAuthService) { }

  login(username: string, password: string): Observable<LoginResponse> {

    return this.http.post<LoginResponse>
      (this.loginUrl, { username: username, password: password }).pipe(
        catchError((error) => {

          throw this.setErrorMessage(error) // rethrows the error, sends a human 
          // readable description of the error to the user
        }),

        tap((loginResponse: LoginResponse) => {

          let expirationDate:Date = new Date(new Date().getTime() + loginResponse.tokenExpirationTime);

          let maximumBooksLoan:number = loginResponse.maximumBooksLoan;

          let maximumBooksReservation: number = loginResponse.maximumBooksReservation;

          this.startTimeOut(expirationDate);

          let user: User = new User(username, loginResponse.token,
            expirationDate, maximumBooksLoan, maximumBooksReservation);
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

    if(!! storedUser ) { // if stored user not null not undefined

    let storedUserDetails:StoredUserDetails = JSON.parse(storedUser);

    let expirationDate:Date = new Date(storedUserDetails.tokenExpirationDate);

    let maximumBooksLoan:number = Number(storedUserDetails._maximumBooksLoan);

    let maximumBooksReservation:number = Number(storedUserDetails._maximumBooksReservation);

    let user:User = new User(storedUserDetails.username, 
    storedUserDetails._token, expirationDate, maximumBooksLoan, maximumBooksReservation);

    this.startTimeOut(expirationDate)

    this.userAuthService.userSubject.next(user);

    }

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

  private startTimeOut(expirationDate:Date):void{

    let timeRemainingInms = expirationDate.getTime() - new Date().getTime();

    if(timeRemainingInms <= 0){ // timed out

      this.userAuthService.userSubject.next(null);

      this.endTimeOut();

      return;

    }

      //if timer exists, reset it

      this.timer = setTimeout(

        () => {

          this.endTimeOut();

        },timeRemainingInms);

  }

  private endTimeOut():void{

    if(!!this.timer){ // if timer is not null

    this.userAuthService.userSubject.next(null);

    clearTimeout(this.timer);

    this.logout();

    }
  }


}
