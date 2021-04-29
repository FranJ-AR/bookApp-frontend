import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookUserStatus } from '../../model/BookUserStatus';
import { Book } from '../../model/Book';
import { Loan } from '../../model/Loan';
import { Reservation } from '../../model/Reservation';
import { User } from '../../model/User';
import { UserAuthService } from 'src/services/user-auth.service';
import { ReservationService } from 'src/services/reservation.service';
import { LoanService } from 'src/services/loan.service';
import { MatDialog } from "@angular/material/dialog";
import { DialogConfirmDeletionReservationComponent } from '../dialog-confirm-deletion-reservation/dialog-confirm-deletion-reservation.component';
import { Constants } from 'src/constants';


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

  loanedBooks: Book[] = [];
  reservatedBooks: Book[] = [];

  showDetailsLoanedBook: boolean = false;
  showDetailsReservatedBook: boolean = false;

  indexArrayBooksLoaned: number = -1;
  indexArrayBooksReservated: number = -1;

  constructor(private userAuthService: UserAuthService,
    private loanService: LoanService, private reservationService: ReservationService,
    private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.userSubscription = this.userAuthService.userSubject.subscribe((user: User | null) => {

      this.user = user;

      // When session ends, redirect

      if (user === null) {

        this.router.navigate(['/index']);


      }

    })

    this.getLoans();

    this.getReservations();

  }

  ngOnDestroy(): void {

    if (this.userSubscription !== null) {

      this.userSubscription.unsubscribe();
    }
  }

  private getLoans(): void {

    this.loanService.getLoansByLoggedUser().subscribe((loans) => {

      this.loans = loans;

    })

  }

  selectedRemoveReservation(bookId: number){

    this.openDialog(bookId);

  }

  removeReservation(bookId: number) {

    

    this.reservationService.removeReservationByLoggedUser(bookId).subscribe(() => {

      // Success

      let index = 0;

      this.reservations.some((reservation, indexFound) => {

        // find the element in the array

        if (reservation.book.id === bookId) {

          index = indexFound;

          return true;

        }

        return false;
      })

      // If the user is checking book details and it is removed, close the details' view

      if (this.showDetailsReservatedBook &&
        this.reservatedBooks[this.indexArrayBooksReservated].id === bookId) {

        this.showDetailsOnReservationBookClose(null);

      }

      this.reservations.splice(index, 1);

    })

  }

  private getReservations(): void {

    this.reservationService.getReservationsByLoggedUser().subscribe((reservations) => {

      this.reservations = reservations;

    })

  }

  private getBookIdByBookIndex(bookList: Book[], id: number): number {

    /* checks every value until from index 0 to size-1 until 
       one matches the condition and stops */

    let indexFound: number = -1;

    bookList.some((element, index) => {

      if (element.id === id) {

        indexFound = index;

        return true;

      }

      return false;

    })

    return indexFound;

  }

  showDetailsBookLoaned(bookId: number): void {

    this.loansToBooks();

    this.indexArrayBooksLoaned = this.getBookIdByBookIndex(this.loanedBooks, bookId);

    this.showDetailsLoanedBook = true;

  }

  showDetailsBookReservated(bookId: number): void {

    this.reservationsToBooks();

    this.indexArrayBooksReservated = this.getBookIdByBookIndex(this.reservatedBooks, bookId);

    this.showDetailsReservatedBook = true;

  }

  private loansToBooks(): void {

    this.loanedBooks = [];

    this.loans.map((loan) => {

      loan.book.userStatus = BookUserStatus.Loaned;

      this.loanedBooks.push(loan.book);

    })
  }

  private reservationsToBooks(): void {

    this.reservatedBooks = [];

    this.reservations.map((loan) => {

      loan.book.userStatus = BookUserStatus.Reservated;

      this.reservatedBooks.push(loan.book);

    })

  }

  showDetailsOnLoanBookClose(newValue: any): void {

    this.showDetailsLoanedBook = false;

  }

  showDetailsOnReservationBookClose(newValue: any): void {

    this.showDetailsReservatedBook = false;

  }

  openDialog(bookId:number) {

    const dialogConfig = Constants.getDefaultDialogConfig();

    const dialogRef = this.dialog.open(DialogConfirmDeletionReservationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe( (data) => {

      if(data === true){

      this.removeReservation(bookId);

      }

    })

  }
  

}
