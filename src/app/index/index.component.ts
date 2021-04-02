import { Component, OnInit } from '@angular/core';
import { Book } from 'src/Book';
import { ParamsBookSearch } from 'src/ParamsBookSearch';
import { BookService } from '../book.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  items: Book[] = [];

  constructor(private bookService:BookService) { }

  ngOnInit(): void {

    this.getAllBooks();

    //this.getAllBooks();

    //this.getBooksByParams();

  }

  getAllBooks(){

    this.bookService.findAllBooks().subscribe( (books) => {

      this.items = books;

    }, (err) => console.log("Error loading books", err))

  }

  getBooksByParams(){

    let params:ParamsBookSearch = { //"titleSubstring":"Pott"
      "authorId":4
     // "categoryId": number =
     // "subcategoryId": number = 
    }

    this.bookService.findBooksByParams(params).subscribe( (books) => {

      this.items = books;

    }, (err) => console.log("Error loading new books", err))


  }

}
