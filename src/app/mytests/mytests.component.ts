import { Component, OnDestroy, OnInit } from '@angular/core';
import { Loan } from 'src/Loan';
import { LoanService } from '../loan.service';
import { Reservation } from '../Reservation';
import { User } from '../User';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-mytests',
  templateUrl: './mytests.component.html',
  styleUrls: ['./mytests.component.scss']
})
export class MytestsComponent implements OnInit, OnDestroy {

  user: User | null = null;
  loans: Loan[] = []
  reservations: Reservation[] = [];
  numbers: number[] = [1,2,3,4];
  interpolation:string = "interpolation";
  value:boolean = true;

  constructor(private userAuthService:UserAuthService, private loanService:LoanService) { }

  ngOnInit(): void {

    this.userAuthService.userSubject.subscribe( (user:User|null) => {

      this.user = user;

    })

    this.loanService.getLoansByLoggedUser().subscribe( (loans) => {

      this.loans = loans;

      console.log("Loans ", loans);

      console.log("Loan0", loans[0].book.name)

    })
  }

  ngOnDestroy(): void {
    
    this.userAuthService.userSubject.unsubscribe();
  }

}



