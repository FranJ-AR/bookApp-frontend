import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { LoanService } from '../loan.service';
import { ReservationService } from '../reservation.service';
import { UserAuthService } from '../user-auth.service';
import { User } from '../User';
import { Subscription } from 'rxjs';
import { BookUserStatus } from '../BookUserStatus';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit, OnDestroy {

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

  user: User | null = null;

  userSubscription: Subscription | null = null;

  showDetails:boolean = false;

  constructor(private bookService: BookService, private authorService: AuthorService,
    private categoryService: CategoryService, private subcategoryService: SubcategoryService,
    private loanService: LoanService, private reservationService: ReservationService,
    private userAuthService: UserAuthService) { }

  ngOnInit(): void {

    /* load all categories and subcategories */

    this.getAllCategories();

    this.getAllSubcategories();

    this.getAllBooks(); /* on and off to see all books, useful when debugging*/

    //this.getBooksByParams();

    this.userSubscription = this.userAuthService.userSubject.subscribe((user) => {

      this.user = user;

    })

  }

  ngOnDestroy(): void {

    if (this.userSubscription !== null) {

      this.userSubscription.unsubscribe();

    }
  }

  getAllBooks() {

    this.bookService.findAllBooks().subscribe((books) => {

      this.books = books;

      this.getLoanAndReservatedBooks();

    }, (err) => {} )

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

      this.getLoanAndReservatedBooks();

    }, (err) => {

      this.showSpinner = false;

    })

  }

  getAllCategories(): void {

    this.categoryService.getAllCategories().subscribe(

      (categories: Category[]) => {

        this.categories = categories;

        this.categories.unshift(this.getDefaultCategory());

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

    this.authorService.getAuthorBySubstring(substringAuthor).subscribe(

      (authors: Author[]) => {

        this.authors = authors;

      }, (error) => {

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

  private getLoanAndReservatedBooks():void{

    if (!!this.user) { // if user not null or undefined, i.e. a user has not logged in

      this.getLoanBookIdsByLoggedUser();

      this.getReservationBookIdsByLoggedUser();

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

  private getLoanBookIdsByLoggedUser():void{

    this.loanService.getBookIdLoansByLoggedUser().subscribe((loanBookIds: Map<number,null>) => {

      this.fillBooksPresentList(loanBookIds, BookUserStatus.Loaned);

    })

  }

  private getReservationBookIdsByLoggedUser():void{

    this.reservationService.getBookIdReservationsByLoggedUser().subscribe((reservations: Map<number,null>) => {

      this.fillBooksPresentList(reservations, BookUserStatus.Reservated);

    })

  }

  /* Marks the books with a label (loaned or reservated) depending if the book is currently loaned or 
  reservated by the logged user */

  private fillBooksPresentList(listBookIds:Map<number,null>,bookUserStatus:BookUserStatus):void{

    this.books.map( (book) => {

      if(this.isPresentBookOnList(book.id, listBookIds) ){

        book.userStatus = bookUserStatus;

      }

    })

  }

  /* Evaluates the presence or not of the provided book on the booklist
  (typically because the user is currenly loaning or reservating that book )
  Returns true if the book is on the booklist
  returns false when not finding the book on the list, 
  the list is null (the user has not logged to check or an error loading the list) or the list
  is empty */

  private isPresentBookOnList(bookId:number, bookIds:Map<number,null>):boolean{

    return bookIds !== null && bookIds.has(bookId);

  }

  showDetailsBook(id: number): void {

    this.findBookIdByBookIndex(id);

    this.showDetails = true;
  }

  // has a placeholder value, required by Angular but not needed
  showDetailsOnClose(newValue:any):void{

    this.showDetails = false;

  }

}
