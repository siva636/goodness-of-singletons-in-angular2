import { bootstrap } from '@angular/platform-browser-dynamic';
import {LoginService} from './login.service';
import {APP_ROUTER_PROVIDERS} from './routes';
import {RoutingComponent} from './routing.component';


bootstrap(RoutingComponent, [LoginService, APP_ROUTER_PROVIDERS]);
