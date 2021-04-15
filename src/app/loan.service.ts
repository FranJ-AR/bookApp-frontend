import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from 'src/Loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private getLoansUrl:string = "http://localhost:8080/loans";

  private addLoanUrl:string = "http://localhost:8080/add-loan/{id}";

  constructor(private httpClient:HttpClient) { }

  getLoansByLoggedUser():Observable<Loan[]>{

    return this.httpClient.get<Loan[]>(this.getLoansUrl);

  }

  addLoanByLoggedUser(id:number):Observable<void>{

    return this.httpClient.post<void>(this.addLoanUrl.replace("{id}",id.toString()),null);
  }

}