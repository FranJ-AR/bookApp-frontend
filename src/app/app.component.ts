import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './User';
import { UserAuthService } from './user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularAuth2';

  authenticated:boolean = false;

  username:string = "";

  constructor(private userAuthService:UserAuthService){

    //const result:Observable<User|null> = userAuthService.user.pipe( tap( (user:User|null) => {console.log(user)} ));

    //result.subscribe( (user:User) => {});

    userAuthService.user.subscribe( (user) => {

      if(user === null){

        this.authenticated = false;

      }else{

        this.authenticated = true;
        this.username = user.username;
      }

    })

  }

  login(){

    this.userAuthService.user.next(new User("testuser","null","null",20000));


  }

  closeSession(){

    this.userAuthService.user.next(null);

  }
}
