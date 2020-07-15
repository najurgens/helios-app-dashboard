import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class AuthService {

    isAuth = new BehaviorSubject(false);
    public errorText: String;
    private auth:Boolean;
    
    showMenu = new BehaviorSubject(true);

    constructor(private router: Router) {
        this.isAuth.asObservable().subscribe((auth)=>{this.auth = auth});
    }

    // check for access token.
    public isAuthenticated(): Boolean {
        return sessionStorage.getItem('auth')!==null ? true : false;
        //return this.auth;
    }

    // set isAuth.
    public setAuthState() {
        sessionStorage.getItem('auth')!==null ? this.isAuth.next(true) : this.isAuth.next(false);
    }

    // set auth.
    public setAuth(val: Boolean) {
        this.auth = val;
    }
    
    // logout.
    public logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('auth');
        this.isAuth.next(false);
        this.router.navigate(['/login']);
    }

}