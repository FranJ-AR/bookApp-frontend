import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  private isLoginMode: boolean = false;

  private messageRegister: string = "Registrar nuevo usuario";

  private messageLogin: string = "Iniciar sesión";

  messageErrorLogin: boolean = false;

  errorMessage: string = "";

  infoSection: string = "";

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {

    if (this.router.url.includes("/login")) {
      this.isLoginMode = true;

    } else {

      this.isLoginMode = false;

    }

    this.router.onSameUrlNavigation = 'reload';

    console.log("This route", this.isLoginMode);

    console.log("This route", this.router.url);

    if (this.isLoginMode) { this.infoSection = this.messageLogin; }

    else { this.infoSection = this.messageRegister; }

  }

  validateUserPassword(username: string, password: string): boolean {

    let errorLength: boolean = false;

    if (username.length < 5) {

      errorLength = true;

      this.messageErrorLogin = true;

      this.errorMessage = "El nombre de usuario debe tener al menos 5 caracteres";

    }

    if (password.length < 5) {

      errorLength = true;

      this.messageErrorLogin = true;

      // if not null error message, add a line break to add the following message
      if (this.errorMessage !== "") { this.errorMessage += "\n"; }

      this.errorMessage += "La contraseña debe tener al menos 5 caracteres";

    }

    return errorLength;

  }

  submitAuthForm(loginForm: NgForm) {

    let username: string = loginForm.value.username;

    let password: string = loginForm.value.password;

    if (this.validateUserPassword(username, password)) { // if error, end form by returning

      return;

    }

    if (this.isLoginMode === true) {

      this.login(username, password);

    }

  }

  login(username: string, password: string) {

      this.loginService.login(username, password).subscribe((val) => {

        // user succeeds to login, so redirect

        console.log("user fully logged", val), this.messageErrorLogin = false;

        this.router.navigate(['private-section']);

      },

        (errorMessage: string) => {
          this.messageErrorLogin = true;

          this.errorMessage = errorMessage;

        });

  }

  register(username:string, password: string){


  }



  // user fails to login


  // Sometimes the error retrieved from the server is descriptive 
  //enough to send it back to the user 



}
