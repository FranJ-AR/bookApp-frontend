import { Component, OnInit } from '@angular/core';
import { Book } from 'src/Book';
import { BookService } from '../book.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  items: Book[] = [];

  item1:string = "";

  constructor(private bookService:BookService) { }

  ngOnInit(): void {

    this.bookService.findAllBooks().subscribe( (books) => {

      this.items = books;

      this.item1 = books[4].name;

    }, (err) => console.log("Error loading books", err))
  }

}
