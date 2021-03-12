import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from './User';
import { UserAuthService } from './user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'angularAuth2';

  authenticated:boolean = false;

  username:string = "";

  constructor(private userAuthService:UserAuthService, private loginService:LoginService){

    //const result:Observable<User|null> = userAuthService.user.pipe( tap( (user:User|null) => {console.log(user)} ));

    //result.subscribe( (user:User) => {});

  }
  

  public ngOnInit(){

    this.autologin();

    this.userAuthService.userSubject.subscribe( (user) => {

      if(!! user){ // not logged

        this.authenticated = true;
        this.username = user.username;

      }else{ // logged

        this.authenticated = false;
      }

    })

  }

  login(){

    this.userAuthService.userSubject.next(new User("testuser","null","null",new Date()));


  }

  closeSession(){

    this.loginService.logout();

  }

  ngOnDestroy(): void {

    this.userAuthService.userSubject.unsubscribe();

  }

  autologin(){

    this.loginService.autologin();

  }

  
}
