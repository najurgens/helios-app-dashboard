import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn:'root'
})
//@Injectable()
export class DataService {

    path:String = 'http://localhost:3001/api/';
    private profileSource = new BehaviorSubject([]);
    profiles = this.profileSource.asObservable();


    constructor(private http:HttpClient) {
    }

    public getPermissions(permission, token, url) {
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
        return this.http.get(this.path+permission, httpOptions);
        //return "hello";
    }

    public getProfiles(profiles, token, url) {
        console.log('TOKEN IN DATA-SERVICE: ' + token)
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + token,
                instanceUrl : url
            }),
            withCredentials: true
        };
        //return this.http.get<any>(this.path+profiles, httpOptions);
        this.http.get<any>(this.path+profiles, httpOptions).subscribe(data=> this.profileSource.next(data));
        //return "hello2";
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
        return this.http.get(this.path+data, httpOptions);
        //return "hello2";
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
        return this.http.get(this.path+data, httpOptions);
        //return "hello2";
    }
}