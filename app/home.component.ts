import { Component } from '@angular/core';
import {LoginService} from './login.service';


@Component({
  selector: 'home',
  //providers: [LoginService], //Don't do this, provide LoginService in bootstrap
  template: `
  <h1> Home Component </h1>
  {{loginService.isLoggedIn?'You are logged in...': 'You are NOT logged in (go to the login component, log in, then come back & check the message here...)'}}
  `
})

export class HomeComponent {

  constructor(private loginService: LoginService) {
  }

}

