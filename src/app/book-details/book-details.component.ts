import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/Book';
import { BookUserStatus } from '../BookUserStatus';
import { LoanService } from '../loan.service';
import { ReservationService } from '../reservation.service';
import { User } from '../User';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() books: Book[] = [];
  @Input() indexArrayBooks = -1;
  @Output() showDetailsCloseEvent:EventEmitter<null> = new EventEmitter<null>();

  hasUp: boolean = false;
  hasDown: boolean = false;

  localIndexArrayBooks:number = -1;
  user:User | null = null;
  userSubscription: Subscription | null = null;
  loanLimitReached = false;
  reservationLimitReached = false;

  nombre = "";

  constructor(private userAuthService:UserAuthService, private loanService:LoanService,
    private reservationService:ReservationService) { }

  ngOnInit(): void {

    this.updateArrows();
    this.localIndexArrayBooks = this.indexArrayBooks;
    this.userSubscription = this.userAuthService.userSubject.subscribe( (user) => {
      this.user = user;

      if(!! user){ // if there is a logged user

        this.loanService.getNumberLoansByLoggedUser().subscribe( (currentLoans:number) => {

          console.log("maximumLoans", user.maximumBooksLoan);

          console.log("currentLoans", currentLoans);

          if(user.maximumBooksLoan === currentLoans){

          this.loanLimitReached = true;

          }

        })

        this.reservationService.getNumberReservationsByLoggedUser().subscribe( (currentReservations:number) => {

          console.log("maximumReservations", user.maximumBooksReservation);

          console.log("currentReservations", currentReservations);

          if(user.maximumBooksReservation === currentReservations){

          this.reservationLimitReached = true;

          }

        })

        

      }

    })

  }

  ngOnDestroy(): void {

    if(this.userSubscription !== null){
    this.userSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.localIndexArrayBooks = this.indexArrayBooks;
    this.updateArrows();
  }

  addLoan(id:number):void{

    this.loanService.addLoanByLoggedUser(id).subscribe ( () => {

      //Success

      this.books[this.localIndexArrayBooks].userStatus = BookUserStatus.Loaned;



    } );

  }

  addReservation(id:number):void{

    this.reservationService.addReservationByLoggedUser(id).subscribe( () => {

      //Success

      this.books[this.localIndexArrayBooks].userStatus = BookUserStatus.Reservated;



    });
  }

  goUpList() {

    this.localIndexArrayBooks--;
    this.updateArrows();


  }

  goDownList() {

    this.localIndexArrayBooks++;
    this.updateArrows();

  }

  updateCurrentBook(): void {

    //this.currentBook = this.books[this.indexArrayBooks];

  }

  updateArrows(): void {

    if (this.localIndexArrayBooks > 0) {

      this.hasUp = true;

    } else {

      this.hasUp = false;

    }

    console.log("indexArrayBooks",this.indexArrayBooks);
    console.log("booksLength",this.books.length);

    if (this.localIndexArrayBooks < this.books.length-1) {

      console.log("hasDown",this.hasDown);
      this.hasDown = true;

    } else {

      console.log("hasDown",this.hasDown);
      this.hasDown = false;

    }

  }

  closeDetails():void{

    this.showDetailsCloseEvent.emit(null);

    //this.showDetails = false;
    console.log("close");
  }

}
