import { Component, OnInit } from '@angular/core';
import { Book } from 'src/Book';
import { Category } from 'src/Category';
import { ParamsBookSearch } from 'src/ParamsBookSearch';
import { Subcategory } from 'src/Subcategory';
import { Author } from '../Author';
import { AuthorService } from '../author.service';
import { BookService } from '../book.service';
import { CategoryService } from '../category.service';
import { SubcategoryService } from '../subcategory.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  books: Book[] = [];
  authors: Author[] = [];
  categories: Category[] = []
  subcategories: Subcategory[] = [];

  private categorySubcategoryDefaultName = "Cualquiera";
  private categorySubCategoryDefaultId = 0;

  constructor(private bookService: BookService, private authorService: AuthorService,
    private categoryService: CategoryService, private subcategoryService: SubcategoryService) { }

  ngOnInit(): void {

    this.getAllBooks();

    this.getAllCategories();

    this.getAllSubcategories();

    //this.getAllBooks();

    //this.getBooksByParams();

  }

  getAllBooks() {

    this.bookService.findAllBooks().subscribe((books) => {

      this.books = books;

    }, (err) => console.log("Error loading books", err))

  }

  getBooksByParams(): void {

    let params: ParamsBookSearch = { //"titleSubstring":"Pott"
      "authorId": 4
      // "categoryId": number =
      // "subcategoryId": number = 
    }

    this.bookService.findBooksByParams(params).subscribe((books) => {

      this.books = books;

    }, (err) => console.log("Error loading new books", err))


  }

  getAllCategories(): void {

    this.categoryService.getAllCategories().subscribe(

      (categories: Category[]) => {

        this.categories = categories;

        this.categories.unshift(this.getDefaultCategory());

        console.log(categories);

      }, (error) => { }

    )

  }

  getAllSubcategories(): void {

    this.subcategoryService.getAllSubcategories().subscribe(

      (subcategories: Subcategory[]) => {

        this.subcategories = subcategories;

        this.subcategories.unshift(this.getDefaultSubcategory());

      }, (error) => { }

    )

  }

  getAuthorsBySubtring(substringAuthor: string): void {

    this.authorService.getAuthorBySubstring(substringAuthor).subscribe(

      (authors: Author[]) => {

        this.authors = authors;

      }, (error) => { }

    )


  }

  private getDefaultCategory():Category{

    return {id: this.categorySubCategoryDefaultId, name: this.categorySubcategoryDefaultName};
  }

  private getDefaultSubcategory():Category{

    return {id: this.categorySubCategoryDefaultId, name: this.categorySubcategoryDefaultName};
  }

}
