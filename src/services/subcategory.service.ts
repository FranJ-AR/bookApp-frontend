import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/constants';
import { Subcategory } from 'src/model/Subcategory';

@Injectable({
  providedIn: 'root'
})

export class SubcategoryService {

  private subcategoryUrl:string = Constants.ROOT_CONNECTION+"all-subcategories";

  constructor(private httpClient:HttpClient) { }

  getAllSubcategories():Observable<Subcategory[]>{

    return this.httpClient.get<Subcategory[]>(this.subcategoryUrl);

  }
}
