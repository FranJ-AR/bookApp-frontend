import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Book } from 'src/Book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnChanges {

  @Input() books: Book[] = [];
  @Input() indexArrayBooks = -1;

  hasUp: boolean = false;
  hasDown: boolean = false;

  localIndexArrayBooks:number = -1;

  nombre = "";

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    alert(this.books);
    alert(this.indexArrayBooks);
    this.localIndexArrayBooks = this.indexArrayBooks;
    this.updateArrows();
  }

  ngOnInit(): void {

    this.updateArrows();
    this.localIndexArrayBooks = this.indexArrayBooks;

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
