import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tokenName } from '@angular/compiler';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from './auth-service';

@Injectable({
    providedIn:'root'
})
export class SettingsService {

    path:String = 'http://localhost:3001/api/';

    settingsSource = new BehaviorSubject([]);
    settings = this.settingsSource.asObservable();

    sobjectsSource = new BehaviorSubject([]);
    sObjects = this.sobjectsSource.asObservable();

    constructor(private http:HttpClient, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
        console.log("In settingsservice constructor, preliminary");
        
    }

    public getAllSettings(){
        const authString = JSON.parse(sessionStorage.getItem('auth'));
        console.log('in getSettings from settingsService, authString = ' + authString);
        const accessToken = JSON.parse(authString).accessToken;
        const instanceUrl = JSON.parse(authString).instanceUrl;

        this.getSettings("", accessToken, instanceUrl);
        this.getSObjects("", accessToken, instanceUrl);

    }

    public getSettings(data, token, url) {
        console.log(token);
        console.log(url);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + token,
                InstanceUrl : url
            }),
            withCredentials: true
        };
        console.log(httpOptions);
        this.http.get<any>(this.path+data, httpOptions).pipe(catchError(this.handleError<any>('getSettings',[]))).subscribe(data=>this.settingsSource.next(data));
    }

    public getSObjects(data, token, url) {
        console.log('TOKEN IN SETTINGS-SERVICE: ' + token)
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + token,
                instanceUrl : url
            }),
            withCredentials: true
        };
        this.http.get<any>(this.path+data, httpOptions).pipe(catchError(this.handleError<any>('getSObjects',[]))).subscribe(data=>this.sobjectsSource.next(data));
    }

    private handleError<Any>(operation, result?: Any) {
        return (error: Any): Observable<Any> => {
            console.error(`${operation} failed: ` + error);
            this.router.navigate(['/login']);
            this.authService.isAuth.next(false);
            // call function to display toast here
            // displayReAuthToast();
            return of(result as Any);
        }
    }
}