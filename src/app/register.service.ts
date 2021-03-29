import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private registerUrl = "http://localhost:8080/register";

  constructor(private HttpClient:HttpClient) { }

  register(username:string, password:string):Observable<any>{

    return this.HttpClient.post(this.registerUrl, {username:username, password:password} );


  }


}
