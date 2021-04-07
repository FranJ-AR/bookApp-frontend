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

  searchIcon = faSearch;
  eraserIcon = faEraser;

  books: Book[] = [];
  authors: Author[] = [];
  categories: Category[] = []
  subcategories: Subcategory[] = [];

  private categorySubcategoryDefaultName = "Cualquiera";
  private categorySubCategoryDefaultId = 0;

  selectedCategoryId = 0;
  selectedSubcategoryId = 0;
  selectedAuthorId = 0;
  selectedAuthorName = "";
  showAuthorDropdown = false;
  selectedTitleSubString:string = "";
  searchPerformed:boolean = false;

  noAuthorAndNoTitleError:boolean = false;

  constructor(private bookService: BookService, private authorService: AuthorService,
    private categoryService: CategoryService, private subcategoryService: SubcategoryService) { }

  ngOnInit(): void {

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

  private getBooksByParams(): void {

    let params: ParamsBookSearch = { "titleSubstring": this.selectedTitleSubString,
      "authorId": this.selectedAuthorId,
       "categoryId": this.selectedCategoryId,
       "subcategoryId": this.selectedSubcategoryId 
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

    if ( substringAuthor === "" ) { this.showAuthorDropdown = false;

      this.selectedAuthorId = 0;
      
      return;

    }

    this.showAuthorDropdown = true;

    console.log("author");

    this.authorService.getAuthorBySubstring(substringAuthor).subscribe(

      (authors: Author[]) => {

        this.authors = authors;

        console.log("authors",authors);

      }, (error) => {

        console.log("authorerror", error);
       }

    )


  }

  private getDefaultCategory():Category{

    return {id: this.categorySubCategoryDefaultId, name: this.categorySubcategoryDefaultName};
  }

  private getDefaultSubcategory():Category{

    return {id: this.categorySubCategoryDefaultId, name: this.categorySubcategoryDefaultName};
  }

  selectAuthor(authorId:number, authorName:string){

    this.searchPerformed = true;

    console.log("Author",authorId+" "+authorName);

    this.selectedAuthorId= authorId;

    this.selectedAuthorName = authorName;

    this.showAuthorDropdown = false;

    this.getBooksByParams();

    this.noAuthorAndNoTitleError = false;
  }

  triggerSearch():void{

    this.searchPerformed = true;

    this.noAuthorAndNoTitleError = false;

    // If there is no author selected or a substring title provided, disallow search

    console.log(this.selectedAuthorId);
    console.log(this.selectedTitleSubString);
    if(this.selectedAuthorId === 0 && this.selectedTitleSubString === ""){

      this.noAuthorAndNoTitleError = true;

      this.books = [];

      return;

    }

    this.getBooksByParams();

  }

  removeAuthor(){

    this.selectedAuthorId = 0;
    this.selectedAuthorName = "";

    this.triggerSearch();

    if(this.selectedTitleSubString === ""){

      this.noAuthorAndNoTitleError;

    }

  }

}
