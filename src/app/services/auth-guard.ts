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
        //console.log('AUTH-GUARD refreshToken: ' + AuthService.refreshToken + ', accessToken: ' + AuthService.accessToken + ', user: ' + AuthService.currentUser + ', instanceUrl: ' + AuthService.instanceUrl);
        if (this.authService.isAuthenticated()) {
            console.log('FROM AUTH GUARD, ALREADY AUTHENTICATED!!!');
            return true;
        } else {
            console.log('activatedRoute IN AUTH-GUARD: ' + this.activatedRoute.pathFromRoot);
            console.log('router IN AUTH-GUARD: ' + this.router.url);
            console.log('route IN AUTH-GUARD: ' + route.url + ', ' + route.root + ', ' + route.queryParams + ', ' + route.pathFromRoot);
            console.log('state IN AUTH-GUARD: ' + decodeURIComponent(state.url) + ', ' + state.root);
            console.log('LOOK AT THIS: ' + state.url.includes('accessToken'));

            if (state.url.includes('accessToken')) {
                const auth = decodeURIComponent(state.url).split("=")[1];
                console.log('AUTH-GUARD PARSED: ' + auth);
                sessionStorage.setItem('auth', JSON.stringify(auth));
                console.log('WITHIN AUTH GUARD SESSION STORAGE = ' + sessionStorage.getItem('auth'));
                this.showMenusChange.next(true);
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