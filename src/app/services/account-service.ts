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
export class AccountService {

    path:String = 'http://localhost:3001/api/';

    accountSource = new BehaviorSubject(null);
    account = this.accountSource.asObservable();

    private accountNameSource = new BehaviorSubject(null);
    accountName = this.accountNameSource.asObservable();

    keyPermissionsSource = new BehaviorSubject({});
    keyPermissions = this.keyPermissionsSource.asObservable();

    keyObjectsSource = new BehaviorSubject({});
    keyObjects = this.keyObjectsSource.asObservable();

    private orgInfoSource = new BehaviorSubject([]);
    orgInfo = this.orgInfoSource.asObservable();

    constructor(private http:HttpClient, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    }

    /*
    public getAccount(data, token, url, orgId) {
        console.log('Within ACCOUNT-SERVICE, getAccount, token = ' + token + ', url = ' + url);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + token,
                instanceUrl : url
            }),
            withCredentials : true
        };
        this.http.get<any>(this.path+data+'/'+orgId, httpOptions, ).pipe(catchError(this.handleError<any>('getAccount',[]))).subscribe((data)=>{
            console.log('getAccount data: ' + data);
            this.accountSource.next(data);
        });
    }
    */

    public getAccount(data, token, url, orgId): Observable<Object> {
        console.log('Within ACCOUNT-SERVICE, getAccount, token = ' + token + ', url = ' + url);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + token,
                instanceUrl : url
            }),
            withCredentials : true
        };
        return this.http.get<any>(this.path+data+'/'+orgId, httpOptions).pipe(catchError(this.handleError<any>('getAccount',[])));
    }

    public refreshAccountInformation(data, token, url, orgId) {
        const authGov = JSON.parse(JSON.parse(sessionStorage.getItem('auth')));
        this.getAccount('account', authGov.authGovAccessToken, authGov.authGovInstanceUrl, authGov.user.organizationId).subscribe((account)=>{
            if (account) {

                // if valid account returned, populate key settings
                if (JSON.stringify(account)!=='[]') {
                    this.accountSource.next(account);
                    this.accountSource.subscribe((acct)=>{
                        console.log('acct already created: ' + JSON.stringify(acct));
                        this.keyPermissionsSource.next(JSON.parse(acct[0].Key_Permissions__c));
                        this.keyObjectsSource.next(JSON.parse(acct[0].Key_Objects__c));
                    });
                }
            }
        });
    }

    /*
    public createAccount(data, token, url, body) {
        console.log('Within Account-SERVICE, createAccount');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                Authorization:'Bearer ' + token,
                instanceUrl : url
            }),
            withCredentials: true,
            body: body
        };
        this.http.post<any>(this.path+data, body, httpOptions).pipe(catchError(this.handleError<any>('createAccount',[]))).subscribe(data=>console.log(data));
    }
    */

    public createAccount(data, token, url, body): Observable<Object> {
        console.log('Within Account-SERVICE, createAccount, token = ' + token + ', url = ' + url);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                Authorization:'Bearer ' + token,
                instanceUrl : url
            }),
            withCredentials: true,
            body: body
        };
        return this.http.post<any>(this.path+data, body, httpOptions).pipe(catchError(this.handleError<any>('createAccount',[])));
    }

    public saveSystemSettings(data, token, url, body): Observable<Object> {
        console.log('Within Account-SERVICE, saveSettings');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token,
                instanceUrl: url
            }),
            withCredentials: true,
            body: body
        };
        return this.http.post<any>(this.path+data, body, httpOptions).pipe(catchError(this.handleError<any>('saveSettings',[])));
    }

    public getSystemSettings(data, token, url): Observable<Object> {
        console.log('Within Account-SERVICE, getSettings');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token,
                instanceUrl: url
            }),
            withCredentials: true
        };
        return this.http.get(this.path+data, httpOptions).pipe(catchError(this.handleError<any>('getSettings',[])));
    }

    public getObjectSettings(data, token, url): Observable<Object> {
        console.log('Within Account-service, getObjectSettings');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':'application/json',
                Authorization: 'Bearer ' + token,
                instanceUrl: url
            }),
            withCredentials: true
        };
        return this.http.get(this.path+data, httpOptions).pipe(catchError(this.handleError<any>('getObjectSettings',[])));
    }

    /*
    public getOrgInfo(data, token, url) {
        console.log('Within account-service, getOrgInfo, data=' + data + ', token=' + token + ', url='+url);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
                instanceUrl: url
            }),
            withCredentials: true
        };
        this.http.get(this.path+data, httpOptions).pipe(catchError(this.handleError<any>('getOrgInfo',[]))).subscribe((data)=>{console.log('org-info data: ' + JSON.stringify(data)); this.orgInfoSource.next(data)});
    }
    */

    public getOrgInfo(data, token, url): Observable<Array<Object>> {
        console.log('Within account-service, getOrgInfo, data=' + data + ', token=' + token + ', url='+url);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
                instanceUrl: url
            }),
            withCredentials: true
        };
        return this.http.get(this.path+data, httpOptions).pipe(catchError(this.handleError<any>('getOrgInfo',[])));
    }

    private handleError<Any>(operation, result?: Any) {
        return (error: Any): Observable<Any> => {
            console.error(`${operation} failed: ` + error);
            this.authService.isAuth.next(false);
            sessionStorage.removeItem('auth');
            this.router.navigate(['/login']);
            console.log(this.authService.isAuth.subscribe((auth)=>console.log('within handleError, after rejection, auth = ' + auth)));
            this.authService.showMenu.next(false);
            // call function to display toast here
            // displayReAuthToast();
            return of(result as Any);
        }
    }
}