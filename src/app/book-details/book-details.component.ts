import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from 'src/Book';
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

  hasUp: boolean = false;
  hasDown: boolean = false;

  localIndexArrayBooks:number = -1;
  user:User | null = null;

  nombre = "";

  constructor(private userAuthService:UserAuthService) { }

  ngOnInit(): void {

    this.updateArrows();
    this.localIndexArrayBooks = this.indexArrayBooks;
    this.userAuthService.userSubject.subscribe( (user) => {
      this.user = user;
    })

  }

  ngOnDestroy(): void {
    this.userAuthService.userSubject.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    alert(this.books);
    alert(this.indexArrayBooks);
    this.localIndexArrayBooks = this.indexArrayBooks;
    this.updateArrows();
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

}
