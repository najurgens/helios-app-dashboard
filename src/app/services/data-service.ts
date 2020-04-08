import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn:'root'
})
export class DataService {

    path:String = 'http://localhost:3001/api/';

    constructor(private http:HttpClient) {}

    public getPermissions(permission, token, url) {
        /*const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + token,
                instanceUrl : url
            })
        };
        return this.httpClient.get(this.path+permission, httpOptions);*/
        //return "hello";
    }

    public getProfiles(profiles, token, url) {
        /*console.log('TOKEN IN DATA-SERVICE: ' + token)
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + token,
                instanceUrl : url
            })
        };
        return this.httpClient.get(this.path+profiles, httpOptions);*/
        //return "hello2";
    }
}