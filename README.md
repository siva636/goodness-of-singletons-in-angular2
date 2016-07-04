#Goodness of Singletons in Angular 2

##What are singletons?
Singletons are object instances, but guaranteed to be a single instance per object in a particular context. After an instance is created and used, it is cached and kept, and when it is required again, the same instance is retrieved.

##Singletons and Angular 2
In Angular 2, all the services that we inject using the built in dependency injection framework are singletons.

The philosophy of singletons is not new with Angular 2, they had been used elsewhere, for example in Java EE / Spring world, many Spring beans are singletons and we have singleton EJBs.

Singleton instances are used for performance reasons, well, thats obvious. But there is another significant benefit of singletons. Yes, singletons may be used to store application state on it. This feature is very useful in single page applications.

Consider the HomeComponent, LoginComponent and LoginService in the sample app provided.

~~~typescript

import { Component } from '@angular/core';
import {LoginService} from './login.service';

@Component({
  selector: 'home',
  template: `
  <h1> Home Component </h1>
  {{loginService.isLoggedIn?'You are logged in...': 'You are NOT logged in (go to the login component, log in, then come back & check the message here...)'}}
  `
})
export class HomeComponent {

  constructor(private loginService: LoginService) {
  }
}

~~~

~~~typescript

import { Component } from '@angular/core';
import {LoginService} from './login.service';

@Component({
  selector: 'login',
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

~~~

~~~typescript

import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
    isLoggedIn: boolean = false;
}

~~~

We inject LoginService into LoginComponent and save the login state on it. The LoginService is again injected into HomeComponent and the login status is retrieved from that. Because the LoginService is a singleton, same instance is injected into the LoginComponent and HomeComponent, the injected singleton can be used as a client side storage of application states.


>Note:

>Client side storage of application states is a widely discussed topic. Using singleton services is just one of them and there are other ways, for example [ngrx store](https://github.com/ngrx/store).

##Do not have multiple singletons
If you have multiple singletons, the ability of using the singleton as a single storage of application states is no longer valid. Multiple singletons are possible if you provide the service in multiple locations. For example two singletons will be created if you provide the LoginService for each HomeComponent and LoginComponent as shown bellow:

```typescript

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

```
```typescript

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

```

The correct way of providing the LoginService in this context is to provide it in bootstrap as shown bellow:

```typescript

import { bootstrap } from '@angular/platform-browser-dynamic';
import {LoginService} from './login.service';
import {APP_ROUTER_PROVIDERS} from './routes';
import {RoutingComponent} from './routing.component';

bootstrap(RoutingComponent, [LoginService, APP_ROUTER_PROVIDERS]);

```

>Note:

>If you want to use the singleton in a component and its child components only, just provide it in the component. If you want to use it application wide, then provide it in the bootstrap.
