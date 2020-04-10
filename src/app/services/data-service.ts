import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
    providedIn:'root'
})
export class DataService {

    path:String = 'http://localhost:3001/api/';

    constructor(private httpClient:HttpClient) {}

    public getPermissions(permission, token, url) {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + token,
                instanceUrl : url,
                withCredentials : 'true'
            })
        };
        return this.httpClient.get(this.path+permission, httpOptions);
        //return "hello";
    }

    public getProfiles(profiles, token, url) {
        console.log('TOKEN IN DATA-SERVICE: ' + token)
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + token,
                instanceUrl : url,
                withCredentials : 'true'
            })
        };
        return this.httpClient.get(this.path+profiles, httpOptions);
        //return "hello2";
    }

    public customQuery(queryString, token, url) {
        console.log('in CUSTOM QUERY');
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type' : 'application/json',
                Authorization : 'Bearer ' + token,
                instanceUrl : url,
                withCredentials : 'true'
            })
        };

        const body = {query : queryString}, path = 'http://localhost:3001/api/query';
        return this.httpClient.post(path, body, httpOptions)
    }

    public getAccounts(accounts) {
        console.log('in getAccounts() api');
        return this.httpClient.get(this.path+accounts, {withCredentials: true});
    }
}