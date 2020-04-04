import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class AuthService {

    path: 'http://localhost:3001/auth/login';
    accessToken: String;
    userInfo: Object;
    instanceURL: String;
    constructor(private http:HttpClient) {}

    public authenticate(loginUrl) {
        console.log('within authservice authenticate!');
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              //Authorization: 'bearer ' + token
            })
          };
        const path = 'http://localhost:3001/auth/login';
        //const path = 'https://' + domain + '/api/project?' + 'email=' + email;
        return this.http.get(path, httpOptions).subscribe( data => console.log(data));
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