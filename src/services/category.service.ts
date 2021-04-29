import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/constants';
import { Category } from 'src/model/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoriesUrl:string = Constants.ROOT_CONNECTION+"all-categories";

  constructor(private httpClient:HttpClient) { }

  getAllCategories():Observable<Category[]>{

    return this.httpClient.get<Category[]>(this.categoriesUrl);

    }
    

  
}
