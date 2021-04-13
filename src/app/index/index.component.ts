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
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEraser } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  /* icons */
  searchIcon = faSearch;
  eraserIcon = faEraser;

  /* data */
  books: Book[] = [];
  authors: Author[] = [];
  categories: Category[] = []
  subcategories: Subcategory[] = [];

  /* default (sub)categories for display */
  private categorySubcategoryDefaultName = "Cualquiera";
  private categorySubCategoryDefaultId = 0;

  /* form data */
  selectedCategoryId = 0;
  selectedSubcategoryId = 0;
  selectedAuthorId = 0;
  selectedAuthorName = "";
  showAuthorDropdown = false;
  selectedTitleSubString: string = "";
  searchPerformed: boolean = false;

  /* when neither author or title is provided */
  noAuthorAndNoTitleError: boolean = false;

  /* whether showing spinner or not */
  showSpinner: boolean = false;

  /* book details id */

  indexArrayBooks: number = -1;

  constructor(private bookService: BookService, private authorService: AuthorService,
    private categoryService: CategoryService, private subcategoryService: SubcategoryService) { }

  ngOnInit(): void {

    /* load all categories and subcategories */

    this.getAllCategories();

    this.getAllSubcategories();

    this.getAllBooks(); /* on and off to see all books, useful when debugging*/

    //this.getBooksByParams();

  }

  getAllBooks() {

    this.bookService.findAllBooks().subscribe((books) => {

      this.books = books;

    }, (err) => console.log("Error loading books", err))

  }

  private getBooksByParams(): void {

    this.showSpinner = true;

    /* building params, absent params are sent with 0 or empty string values 
       depending on the param type */

    let params: ParamsBookSearch = {
      "titleSubstring": this.selectedTitleSubString,
      "authorId": this.selectedAuthorId,
      "categoryId": this.selectedCategoryId,
      "subcategoryId": this.selectedSubcategoryId
    }

    this.bookService.findBooksByParams(params).subscribe((books) => {

      this.books = books;

      this.showSpinner = false;

    }, (err) => {
      console.log("Error loading books", err);

      this.showSpinner = false;

    })

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

    if (substringAuthor === "") {
      this.showAuthorDropdown = false;

      this.selectedAuthorId = 0;

      return;

    }

    this.showAuthorDropdown = true;

    console.log("author");

    this.authorService.getAuthorBySubstring(substringAuthor).subscribe(

      (authors: Author[]) => {

        this.authors = authors;

        console.log("authors", authors);

      }, (error) => {

        console.log("authorerror", error);
      }

    )


  }

  private getDefaultCategory(): Category {

    return { id: this.categorySubCategoryDefaultId, name: this.categorySubcategoryDefaultName };
  }

  private getDefaultSubcategory(): Category {

    return { id: this.categorySubCategoryDefaultId, name: this.categorySubcategoryDefaultName };
  }

  selectAuthor(authorId: number, authorName: string) {

    this.searchPerformed = true;

    console.log("Author", authorId + " " + authorName);

    this.selectedAuthorId = authorId;

    this.selectedAuthorName = authorName;

    this.showAuthorDropdown = false;

    this.getBooksByParams();

    this.noAuthorAndNoTitleError = false;
  }

  triggerSearch(): void {

    this.searchPerformed = true;

    this.noAuthorAndNoTitleError = false;

    // If there is no author selected or a substring title provided, disallow search

    console.log(this.selectedAuthorId);
    console.log(this.selectedTitleSubString);
    if (this.selectedAuthorId === 0 && this.selectedTitleSubString === "") {

      this.noAuthorAndNoTitleError = true;

      this.books = [];

      return;

    }

    this.getBooksByParams();

  }

  removeAuthor(): void {

    this.selectedAuthorId = 0;
    this.selectedAuthorName = "";

    this.triggerSearch();

    if (this.selectedTitleSubString === "") {

      this.noAuthorAndNoTitleError;

    }

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

  showDetails(id:number):void{

    this.findBookIdByBookIndex(id);
  }

}
