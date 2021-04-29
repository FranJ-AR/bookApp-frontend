import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Constants } from 'src/constants';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private registerUrl = Constants.ROOT_CONNECTION+"register";

  constructor(private HttpClient: HttpClient) { }

  register(username: string, password: string): Observable<any> {

    return this.HttpClient.post<any>(this.registerUrl,
      { username: username, password: password })
        .pipe(
        catchError((error) => {

          throw this.setErrorMessage(error);
         

        }
        )

      )

  }

  private setErrorMessage(error: any): string {

    let errorMessage:string = error.error.errorMessage;

    if(errorMessage === "User already exists"){

      errorMessage = "El nombre de usuario ya existe";

    }else{

      errorMessage = "Ocurrió un error desconocido, vuelve a probar más tarde"
    }

    return errorMessage;
  }

}
