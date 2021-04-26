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

    this.userSubscription = this.userAuthService.userSubject.subscribe( (user:User|null) => {

      this.user = user;

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

    })

  }

  removeReservation(bookId: number){

    this.reservationService.removeReservationByLoggedUser(bookId).subscribe( () => 
    
    {

      // Success

      let beenFound = false;

      let index = 0;

      this.reservations.some( (reservation, indexFound)  => {

        // find the element in the array

        if( reservation.book.id === bookId) {

          beenFound = true;

          index = indexFound;

          return true;

        }

        return false;
      })

      this.reservations.splice(index, 1);

    })

  }

  private getReservations():void{

    this.reservationService.getReservationsByLoggedUser().subscribe( (reservations) => {

      this.reservations = reservations;

    })

  }

}
