import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class AuthService {

    path: 'http://localhost:3001/auth/login';
    accessToken: String;
    userInfo: Object;
    instanceURL: String;

    constructor(private httpClient:HttpClient) {}

    public authenticate() {
        console.log('within authservice authenticate!');
        console.log('authenticate result: ' + this.httpClient.get(this.path));
    }

    public getAccounts() {
        return this.httpClient.get('http://localhost:3001/api/accounts');
    }

    /*
    public currentUser(): User {
        if (!this.user) {
            this.user = JSON.parse(this.cookieService.getCookie('currentUser'));
        }
        return this.user;
    }

    public loggedIn(): boolean {
        // this.run();
        return this.logged;
    }

    public getLogged() {
        const path = '/api/loggedin';
        return this.http.get(path);
    };

    login(email: string, password: string) {
        console.log('USER email: ' + email + ', password: ' + password);
        return this.http.post<any>(`/api/login`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    this.user = user;
                    // store user details and jwt in cookie
                    this.cookieService.setCookie('currentUser', JSON.stringify(user), 1);
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        this.cookieService.deleteCookie('currentUser');
        this.user = null;
    }

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