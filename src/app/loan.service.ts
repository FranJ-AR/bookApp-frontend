import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from 'src/Loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private loanUrl:string = "http://localhost:8080/loans";

  constructor(private httpClient:HttpClient) { }

  getLoansByLoggedUser():Observable<Loan[]>{

    return this.httpClient.get<Loan[]>(this.loanUrl);

  }


}
