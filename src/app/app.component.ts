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

  constructor(private loginService:LoginService){

  }
  

  public ngOnInit(){

    this.autologin();

  }

  private autologin(){

    this.loginService.autologin();

  }
  
}
