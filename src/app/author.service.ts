import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from './Author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private authorUrl:string = "";

  constructor(private httpClient:HttpClient) { }

  getAuthorBySubstring(substring:string):Observable<Author[]>{

    return this.httpClient.get<Author[]>(this.authorUrl);
  }
}
