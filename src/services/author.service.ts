import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../interfaces/Author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private authorUrl:string = "http://localhost:8080/authors-by-substring-name/author={author}";

  constructor(private httpClient:HttpClient) { }

  getAuthorBySubstring(substring:string):Observable<Author[]>{

    return this.httpClient.get<Author[]>(this.authorUrl.replace("{author}",substring));
  }
}
