import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/constants';
import { Author } from '../model/Author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private authorUrl:string = constants.ROOT_CONNECTION+"authors-by-substring-name/author={author}";

  constructor(private httpClient:HttpClient) { }

  getAuthorBySubstring(substring:string):Observable<Author[]>{

    return this.httpClient.get<Author[]>(this.authorUrl.replace("{author}",substring));
  }
}
