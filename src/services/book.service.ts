import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/constants';
import { ParamsBookSearch } from 'src/model/ParamsBookSearch';
import { Book } from '../model/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private urlAllBooks: string = constants.ROOT_CONNECTION+"all-books";

  private urlBooksByParams: string = constants.ROOT_CONNECTION+"books-by-params";

  private urlBook:string = constants.ROOT_CONNECTION+"{id}";

  constructor(private httpClient: HttpClient) { }

  findAllBooks(): Observable<Book[]> {

    return this.httpClient.get<Book[]>(this.urlAllBooks);


  }


  findBooksByParams(paramsBookSearch: ParamsBookSearch): Observable<Book[]> {

    return this.httpClient.post<Book[]>(this.urlBooksByParams, {
      "titleSubstring": paramsBookSearch.titleSubstring,
      "authorId": paramsBookSearch.authorId,
      "categoryId": paramsBookSearch.categoryId,
      "subcategoryId": paramsBookSearch.subcategoryId
    });

  }

  findBookById(id:number):Observable<Book>{

    let fullUrlBook = this.urlBook.replace("{id}",id.toString());

    return this.httpClient.get<Book>(fullUrlBook);
  }
}
