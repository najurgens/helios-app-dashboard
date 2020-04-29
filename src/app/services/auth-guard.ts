import { Injectable, EventEmitter, Output, Input } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { HttpUrlEncodingCodec, HttpParameterCodec } from '@angular/common/http'
import { AppComponent } from '../app.component'; 

import { AuthService } from './auth-service';
import { decode } from 'punycode';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

    showMenusChange: Subject<Boolean> = new Subject<Boolean>();
    constructor(private router: Router, private authService: AuthService, private activatedRoute: ActivatedRoute) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('isAuth in AuthGuard: ' + this.authService.isAuthenticated());
        if (this.authService.isAuthenticated()) {
            console.log('FROM AUTH GUARD, ALREADY AUTHENTICATED!!!');
            console.log('in AuthGuard, auth = ' + sessionStorage.getItem('auth'));
            return true;
        } else {
            if (state.url.includes('accessToken')) {
                this.authService.isAuth.next(true);
                const auth = decodeURIComponent(state.url).split("=")[1];
                sessionStorage.setItem('auth', JSON.stringify(auth));
                console.log('WITHIN AUTH GUARD, SESSION STORAGE = ' + sessionStorage.getItem('auth'));
                //this.showMenusChange.next(true);
                this.router.navigate(['']);
                return true;
            } else {
                this.router.navigate(['/login'], {
                    queryParams: { return: state.url }
                });
                return false;
            }
        }
    }
    
}