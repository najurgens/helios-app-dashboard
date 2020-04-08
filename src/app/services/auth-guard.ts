/*import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth-service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

    constructor(private router: Router, private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.validUser() && this.authService.loggedIn()) {
          return true;
        } else {
          this.router.navigate(['/login'], {
            queryParams: {
              return: state.url
            }
          });
          return false;
        }
    }




    
}*/