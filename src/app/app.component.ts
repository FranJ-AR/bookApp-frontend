import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { User } from './User';
import { UserAuthService } from './user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angularAuth2';

  //authenticated:boolean = false;

  //username:string = "";

  constructor(private loginService:LoginService){

    //const result:Observable<User|null> = userAuthService.user.pipe( tap( (user:User|null) => {console.log(user)} ));

    //result.subscribe( (user:User) => {});

  }
  

  public ngOnInit(){

    this.autologin();

  }

  private autologin(){

    this.loginService.autologin();

  }
  
}
