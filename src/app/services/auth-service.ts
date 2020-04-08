import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class AuthService {

    constructor(private router: Router) {}

    public isAuthenticated(): Boolean {
        console.log('SESSION STORAGE: ' + sessionStorage.getItem('auth'));
        return sessionStorage.getItem('auth')!==null ? true : false;
    }
    
    public logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('auth');
        this.router.navigate(['/login']);
    }

}