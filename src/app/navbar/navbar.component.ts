import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../User';
import { UserAuthService } from '../user-auth.service';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  faBars = faBars;

  faUser = faUser;

  authenticated:boolean = false;

  username:string = "";

  user:User | null = null;

  navBarLinksMobile:boolean = false;

  navBarUserMobile:boolean = false;

  constructor(private userAuthService:UserAuthService, private loginService:LoginService) { }

  ngOnInit(): void {

    this.userAuthService.userSubject.subscribe( (user) => {

      this.user = user;

      if(!! user){ // not logged

        this.authenticated = true;
        this.username = user.username;

      }else{ // logged

        this.authenticated = false;
      }

    })

  }

  ngOnDestroy(): void {
   
    this.userAuthService.userSubject.unsubscribe();
    
  }

  closeSession(){

    this.loginService.logout();

  }

  visibilityLinksNavBarMobile():void{

    this.navBarUserMobile = false;

    this.navBarLinksMobile = ! this.navBarLinksMobile;

    console.log(this.navBarLinksMobile);
  }

  visibilityUserNavBarMobile():void{

    this.navBarLinksMobile = false;

    this.navBarUserMobile = ! this.navBarUserMobile;

    console.log(this.navBarUserMobile);
  }

}
