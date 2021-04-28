import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/services/login.service';

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
