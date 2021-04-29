import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { constants } from 'src/constants';
import { Loan } from '../model/Loan';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private getLoansUrl: string = constants.ROOT_CONNECTION+"loans";

  private addLoanUrl: string = constants.ROOT_CONNECTION+"add-loan/{id}";

  constructor(private httpClient: HttpClient) { }

  getLoansByLoggedUser(): Observable<Loan[]> {

    return this.httpClient.get<Loan[]>(this.getLoansUrl);

  }

  addLoanByLoggedUser(id: number): Observable<void> {

    return this.httpClient.post<void>(this.addLoanUrl.replace("{id}", id.toString()), null);
  }

  // Gets the ids of the books loaned, empty list is none
  getBookIdLoansByLoggedUser(): Observable<Map<number, null>> {

    return this.getLoansByLoggedUser().pipe(map((loans) => {

      let loanBookIds: Map<number, null> = new Map<number, null>();

      loans.map((loan) => loanBookIds.set(loan.book.id, null));

      return loanBookIds;

    }

    ))

  }

  getNumberLoansByLoggedUser(): Observable<number>{

    return this.getLoansByLoggedUser().pipe( map((loans:Loan[]) => {

      return loans.length; }))

  }

}
