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

  currentBook = this.books[this.indexArrayBooks];
  hasUp: boolean = false;
  hasDown: boolean = false;

  nombre = "Hola";

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    alert("changes");
    this.updateArrows();
  }

  ngOnInit(): void {

    this.currentBook = this.books[this.indexArrayBooks];
    this.updateArrows();

  }

  goUpList() {

    this.indexArrayBooks--;
    this.updateArrows();


  }

  goDownList() {

    this.indexArrayBooks++;
    this.updateArrows();

  }

  updateCurrentBook(): void {

    this.currentBook = this.books[this.indexArrayBooks];

  }

  updateArrows(): void {

    if (this.indexArrayBooks > 0) {

      this.hasUp = true;

    } else {

      this.hasUp = false;

    }

    console.log("indexArrayBooks",this.indexArrayBooks);
    console.log("booksLength",this.books.length);

    if (this.indexArrayBooks < this.books.length-1) {

      console.log("hasDown",this.hasDown);
      this.hasDown = true;

    } else {

      console.log("hasDown",this.hasDown);
      this.hasDown = false;

    }

  }

}
