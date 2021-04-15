import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Loan } from 'src/Loan';
import { LoanService } from '../loan.service';
import { Reservation } from '../Reservation';
import { ReservationService } from '../reservation.service';
import { User } from '../User';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-myBooks',
  templateUrl: './myBooks.component.html',
  styleUrls: ['./myBooks.component.scss']
})
export class MyBooksComponent implements OnInit, OnDestroy {

  user: User | null = null;
  loans: Loan[] = []
  reservations: Reservation[] = [];
  userSubscription: Subscription | null = null;

  constructor(private userAuthService:UserAuthService, 
    private loanService:LoanService, private reservationService:ReservationService) { }

  ngOnInit(): void {

    console.log("launchMyBooks");

    this.userSubscription = this.userAuthService.userSubject.subscribe( (user:User|null) => {

      this.user = user;

      console.log("MyBooksUser",user);

    })

    this.getLoans();

    this.getReservations();

  }

  ngOnDestroy(): void {
    
    if(this.userSubscription !== null){

      this.userSubscription.unsubscribe();
    }
  }

  private getLoans():void{

    this.loanService.getLoansByLoggedUser().subscribe( (loans) => {

      this.loans = loans;

      console.log("Loans ", loans);

    })

  }

  private getReservations():void{

    this.reservationService.getReservationsByLoggedUser().subscribe( (reservations) => {

      this.reservations = reservations;

    })

  }

}