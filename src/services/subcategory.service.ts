import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { constants } from 'src/constants';
import { Subcategory } from 'src/interfaces/Subcategory';

@Injectable({
  providedIn: 'root'
})

export class SubcategoryService {

  private subcategoryUrl:string = constants.ROOT_CONNECTION+"all-subcategories";

  constructor(private httpClient:HttpClient) { }

  getAllSubcategories():Observable<Subcategory[]>{

    return this.httpClient.get<Subcategory[]>(this.subcategoryUrl);

  }
}
