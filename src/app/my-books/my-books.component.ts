import { Component, OnDestroy, OnInit } from '@angular/core';
import { Loan } from 'src/Loan';
import { LoanService } from '../loan.service';
import { Reservation } from '../Reservation';
import { User } from '../User';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit, OnDestroy {

  user: User | null = null;
  loans: Loan[] = []
  reservations: Reservation[] = [];

  constructor(private userAuthService:UserAuthService, private loanService:LoanService) { }

  ngOnInit(): void {

    this.userAuthService.userSubject.subscribe( (user:User|null) => {

      this.user = user;

    })

    this.loanService.getLoansByLoggedUser().subscribe( (loans) => {

      this.loans = loans;

      console.log(loans);

    })
  }

  ngOnDestroy(): void {
    
    this.userAuthService.userSubject.unsubscribe();
  }

}
