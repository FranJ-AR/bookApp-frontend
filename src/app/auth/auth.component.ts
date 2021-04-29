import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/services/login.service';
import { RegisterService } from 'src/services/register.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLoginMode: boolean = false;

  private messageRegister: string = "Registrar nuevo usuario";

  private messageLogin: string = "Iniciar sesión";

  messageErrorLogin: boolean = false;

  errorMessage: string = "";

  infoSection: string = "";

  constructor(private loginService: LoginService, private registerService:RegisterService,
    private router: Router) { }

  ngOnInit(): void {

    if (this.router.url.includes("/login")) {
      this.isLoginMode = true;

    } else {

      this.isLoginMode = false;

    }

    this.router.onSameUrlNavigation = 'reload';

    if (this.isLoginMode) { this.infoSection = this.messageLogin; }

    else { this.infoSection = this.messageRegister; }

  }

  validateUserPassword(username: string, 
    password: string, confirmPassword:string): boolean {

    let errorLength: boolean = false;

    this.errorMessage = "";

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

    // register mode, needs confirm password
    if ( ! this.isLoginMode && confirmPassword.length < 5){

    // if not null error message, add a line break to add the following message
    if (this.errorMessage !== "") { this.errorMessage += "\n"; }

      this.errorMessage += "El campo confirmar contraseña debe tener al menos 5 caracteres";

    }

    if( ! this.isLoginMode && password !== confirmPassword){

      // if not null error message, add a line break to add the following message
      if (this.errorMessage !== "") { this.errorMessage += "\n"; }

      this.errorMessage += "Los campos contraseña y confirmar contraseña deben ser iguales";

    }

    return errorLength;

  }

  submitAuthForm(loginForm: NgForm) {

    let username: string = loginForm.value.username;

    let password: string = loginForm.value.password;

    let confirmPassword: string = loginForm.value.confirmPassword;

    if (this.validateUserPassword(username, password, confirmPassword)) { // if error, end form by returning

      return;

    }

    if (this.isLoginMode === true) {

      this.login(username, password);

    }else {

      this.register(username, password);
    }

  }

  login(username: string, password: string) {

      this.loginService.login(username, password).subscribe((val) => {

        // user succeeds to login, so redirect

        this.router.navigate(['index']);

      },

        (errorMessage: string) => {

          if(errorMessage ===  "Username not found"){

            this.errorMessage = "El nombre de usuario no existe";

          }else if(errorMessage ===  "Incorrect password"){

            this.errorMessage = "La contraseña introducida no es correcta, inténtalo de nuevo";

          }else{

            this.errorMessage = "Ocurrió un error desconocido, intenta de nuevo más tarde";

          }
          this.messageErrorLogin = true;

        });

  }

  register(username:string, password: string){

    this.registerService.register(username, password).subscribe( (_) => {

      // Success

    this.login(username, password);
      
      this.messageErrorLogin = false;

    },

    (errorMessage) => {

      this.messageErrorLogin = true;

      this.errorMessage = errorMessage;

    }
    
    );


  }

  // user fails to login

  // Sometimes the error retrieved from the server is descriptive 
  //enough to send it back to the user 

}
