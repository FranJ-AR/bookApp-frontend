import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../User';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.scss']
})
export class MyBooksComponent implements OnInit, OnDestroy {

  user: User | null = null;

  constructor(private userAuthService:UserAuthService) { }

  ngOnInit(): void {

    this.userAuthService.userSubject.subscribe( (user:User|null) => {

      this.user = user;

    })
  }

  ngOnDestroy(): void {
    
    this.userAuthService.userSubject.unsubscribe();
  }

}
