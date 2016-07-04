import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';


@Component({
  selector: 'app',
  template: `
  <h1>Goodness of Singletons in Angular 2</h1>
  <nav>
    <a [routerLink]="['/home']">Home Component</a>
    <a [routerLink]="['/login']">Login Component</a>
  </nav>
  <router-outlet></router-outlet>
`,
  directives: [ROUTER_DIRECTIVES]
})

export class RoutingComponent {
}

