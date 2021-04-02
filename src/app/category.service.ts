import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesUrl:string = "http://localhost:8080/all-categories";

  constructor(private httpClient:HttpClient) { }

  getAllCategories():Observable<Category[]>{

    return this.httpClient.get<Category[]>(this.categoriesUrl);

    }
    

  
}
