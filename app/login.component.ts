import { Component } from '@angular/core';
import {LoginService} from './login.service';

@Component({
  selector: 'login',
  //providers: [LoginService], //Don't do this, provide LoginService in bootstrap
  template: `
  <h1> Login Component </h1>
  <button (click)='login()' [hidden]='loginService.isLoggedIn'>Login</button>
  <button (click)='logout()' [hidden]='!loginService.isLoggedIn'>Logout</button>  
  `
})

export class LoginComponent {

  constructor(private loginService: LoginService) {
  }

  login() {
    this.loginService.isLoggedIn = true;
  }

  logout() {
    this.loginService.isLoggedIn = false;
  }

}

