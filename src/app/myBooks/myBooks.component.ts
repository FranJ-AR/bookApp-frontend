import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/Book';
import { Loan } from 'src/Loan';
import { BookUserStatus } from '../BookUserStatus';
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
  
  books:Book[] = [];

  showDetails:boolean = false;

  indexArrayBooks: number = -1;

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

  private findBookIdByBookIndex(id: number): void {

    this.indexArrayBooks = -1;

    /* checks every value until from index 0 to size-1 until 
       one matches the condition and stops */

    this.books.some((element, index) => {

      if (element.id === id) {

        this.indexArrayBooks = index;

        return true;

      }

      return false;

    })

  }

  showDetailsBookLoaned(bookId:number):void{

    this.loansToBooks();

    this.showDetails = true;

    this.findBookIdByBookIndex(bookId);
    
  }

  showDetailsBookReservated(bookId:number):void{

    this.reservationsToBooks();

    this.showDetails = true;

    this.findBookIdByBookIndex(bookId);
    
  }

  private loansToBooks():void{

    this.books = [];

    this.loans.map( (loan) => {

      loan.book.userStatus = BookUserStatus.Loaned;

      this.books.push(loan.book);

    })
  }

  private reservationsToBooks():void{

    this.books = [];

    this.reservations.map( (loan) => {

      loan.book.userStatus = BookUserStatus.Reservated;

      this.books.push(loan.book);

    })

  }

  // has a placeholder value, required by Angular but not needed
  showDetailsOnClose(newValue:any):void{

    this.showDetails = false;

  }

}
