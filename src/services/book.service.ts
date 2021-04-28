import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParamsBookSearch } from 'src/interfaces/ParamsBookSearch';
import { Book } from '../interfaces/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private urlAllBooks: string = "http://localhost:8080/all-books";

  private urlBooksByParams: string = "http://localhost:8080/books-by-params";

  private urlBook:string = "http://localhost:8080/{id}";

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
