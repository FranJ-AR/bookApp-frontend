import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url:string = "http://localhost:8080/all-books";

  constructor(private httpClient:HttpClient) { }

  findAllBooks():Observable<Book[]>{
    
    return this.httpClient.get<Book[]>(this.url);


  }
  

  findBooksByParams(params:any):void{

    

  }
}
