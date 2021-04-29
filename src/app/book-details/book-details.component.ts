import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookUserStatus } from '../../interfaces/BookUserStatus';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Book } from '../../interfaces/Book';
import { User } from '../../interfaces/User';
import { UserAuthService } from 'src/services/user-auth.service';
import { LoanService } from 'src/services/loan.service';
import { ReservationService } from 'src/services/reservation.service';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { DialogConfirmLoanComponent } from '../dialog-confirm-loan/dialog-confirm-loan.component';
import { DialogConfirmReservationComponent } from '../dialog-confirm-reservation/dialog-confirm-reservation.component';
import { constants } from 'src/constants';


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnChanges, OnDestroy {

  // icon
  faWindowClose = faWindowClose;

  @Input() books: Book[] = [];
  @Input() indexArrayBooks = -1;
  @Output() showDetailsCloseEvent:EventEmitter<null> = new EventEmitter<null>();

  showDetails:boolean = false;

  hasUp: boolean = false;
  hasDown: boolean = false;

  localIndexArrayBooks:number = -1;
  user:User | null = null;
  userSubscription: Subscription | null = null;
  loanLimitReached = false;
  reservationLimitReached = false;

  nombre = "";

  constructor(private userAuthService:UserAuthService, private loanService:LoanService,
    private reservationService:ReservationService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.updateArrows();
    this.localIndexArrayBooks = this.indexArrayBooks;
    this.userSubscription = this.userAuthService.userSubject.subscribe( (user) => {
      this.user = user;
      this.updateLimitLoanOrReservation();

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

    this.updateLimitLoanOrReservation();
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

    if (this.localIndexArrayBooks < this.books.length-1) {

      this.hasDown = true;

    } else {

      this.hasDown = false;

    }

  }

  closeDetails():void{

    this.showDetailsCloseEvent.emit(null);

  }

  private updateLimitLoanOrReservation():void{

    if(!! this.user){ // if there is a logged user

      this.loanService.getNumberLoansByLoggedUser().subscribe( (currentLoans:number) => {

        if(!! this.user){

        if(this.user.maximumBooksLoan === currentLoans){

        this.loanLimitReached = true;

        }

      }

      })

      this.reservationService.getNumberReservationsByLoggedUser().subscribe( (currentReservations:number) => {

        if(!! this.user){

        if(this.user.maximumBooksReservation === currentReservations){

        this.reservationLimitReached = true;

        }

      }

      })

    }
  }

  openLoanDialog(bookId:number) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = constants.MAX_WIDTH_DIALOG;

    const dialogRef = this.dialog.open(DialogConfirmLoanComponent, dialogConfig);

    dialogRef.afterClosed().subscribe( (data) => {

      if(data === true){

      this.addLoan(bookId);

      }

    })

  }

  openReservationDialog(bookId:number) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = constants.MAX_WIDTH_DIALOG;

    const dialogRef = this.dialog.open(DialogConfirmReservationComponent, dialogConfig);

    dialogRef.afterClosed().subscribe( (data) => {

      if(data === true){

      this.addReservation(bookId);

      }

    })

  }

}
