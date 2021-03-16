import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  messageErrorLogin:boolean = false;

  errorMessage:string = "";

  constructor(private loginService:LoginService, private router:Router) { }

  ngOnInit(): void {
  }

  login(loginForm:NgForm){

    let username = loginForm.value.username;

    let password = loginForm.value.password;

    console.log("sent");

    console.log(loginForm.value);

    console.log(loginForm.value.username);

    this.loginService.login(username, password).subscribe( (val) => {

      // user succeeds to login, so redirect
      
      console.log("user fully logged", val), this.messageErrorLogin = false; 

      this.router.navigate(['private-section']);
    
    }, 

    // user fails to login
    
    (errorMessage:string) => { this.messageErrorLogin = true; 
    
    this.errorMessage = errorMessage;
  
  });

  }


  // Sometimes the error retrieved from the server is descriptive 
  //enough to send it back to the user 
  
  

}
