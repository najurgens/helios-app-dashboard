import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class DataService {

    path:String = 'http://localhost:3001/api/';

    private profileSource = new BehaviorSubject([]);
    profiles = this.profileSource.asObservable();

    private permissionSetSource = new BehaviorSubject([]);
    permissionSets = this.permissionSetSource.asObservable();

    private profileCrudSource = new BehaviorSubject([]);
    profileCrud = this.profileCrudSource.asObservable();

    private permissionSetCrudSource = new BehaviorSubject([]);
    permissionSetCrud = this.permissionSetCrudSource.asObservable();


    constructor(private http:HttpClient,
                private route: ActivatedRoute)
        {
            this.route.queryParams.subscribe(params => {
            if (JSON.stringify(params)!=='{}') {
                const allParams = JSON.parse(params.auth);
                const authObj = { currentUser: allParams['user'], accessToken: allParams['accessToken'], refreshToken: allParams['refreshToken'], instanceUrl: allParams['instanceUrl'] };
                sessionStorage.setItem('auth', JSON.stringify(authObj));
                console.log("In dataservice constructor");
                this.getAllData();
                this.profiles.subscribe(data=>console.log(data));
            }
        });
    }

    public getAllData(){
        let authObj = JSON.parse(sessionStorage.getItem('auth'));
        this.getProfiles('profiles', authObj.accessToken, authObj.instanceUrl);
        this.getPermissions('permission-sets', authObj.accessToken, authObj.instanceUrl);
        this.getProfileCrud('profile-crud-permissions', authObj.accessToken, authObj.instanceUrl);
        this.getPermissionSetCrud('permission-set-crud-permissions', authObj.accessToken, authObj.instanceUrl);
    }

    public test(){
        console.log('Inside test call');
    }

    public getPermissions(data, token, url) {
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
        this.http.get<any>(this.path+data, httpOptions).subscribe(data=> this.permissionSetSource.next(data));
    }

    public getProfiles(data, token, url) {
        console.log('TOKEN IN DATA-SERVICE: ' + token)
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + token,
                instanceUrl : url
            }),
            withCredentials: true
        };
        this.http.get<any>(this.path+data, httpOptions).subscribe(data=>this.profileSource.next(data));
    }

    public getProfileCrud(data, token, url){
        console.log('TOKEN IN DATA-SERVICE: ' + token)
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + token,
                instanceUrl : url
            }),
            withCredentials: true
        };
        this.http.get<any>(this.path+data, httpOptions).subscribe(data=> this.profileCrudSource.next(data));
    }

    public getPermissionSetCrud(data, token, url){
        console.log('TOKEN IN DATA-SERVICE: ' + token)
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + token,
                instanceUrl : url
            }),
            withCredentials: true
        };
        this.http.get<any>(this.path+data, httpOptions).subscribe(data=> this.permissionSetCrudSource.next(data));
    }
}