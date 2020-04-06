import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn:'root'
})
export class AuthService {

    static authenticated: Boolean;
    static currentUser: Object;

    constructor(private http:HttpClient, private route: ActivatedRoute) {
        AuthService.authenticated = false;
        AuthService.currentUser = null;
    }
       
    /*
    public displayKey(){
        const firstParam: string = this.route.snapshot.queryParamMap.get('valid');
        console.log(decodeURIComponent(firstParam));
    }
    */

    public authenticate(address) {
        console.log('within authentication service, address=' + address + ', authenticated='+AuthService.authenticated+', currentUser='+JSON.stringify(AuthService.currentUser));
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type' : 'application/json'
            })
        };
        const path = 'http://localhost:3001/preauth';
        return this.http.post(path,{type:address},httpOptions);
    }

    public validUser(): Boolean {
        if (AuthService.currentUser===null) return false;
        return true;
    }

    public loggedIn(): Boolean {
        return AuthService.authenticated;
    }

    /*
    logout() {
        // remove user from local storage to log user out
        this.cookieService.deleteCookie('currentUser');
        this.user = null;
    }
    */

    /*
    public run() {
        let config;
        this.getLogged().subscribe(
            res => {
                config = res;
            },
            err => {
                console.log(err);
                config = {logged: false};
            },
            () => {
                console.log(config);
                if (config.logged) {
                    console.log('guard success');
                    this.logged = true;
                } else {
                    this.logged = false;
                    console.log('guard failure');
                }
            }
        );
    }*/

}