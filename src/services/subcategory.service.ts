import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subcategory } from 'src/Subcategory';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  private subcategoryUrl:string = "http://localhost:8080/all-subcategories";

  constructor(private httpClient:HttpClient) { }

  getAllSubcategories():Observable<Subcategory[]>{

    return this.httpClient.get<Subcategory[]>(this.subcategoryUrl);

  }
}
