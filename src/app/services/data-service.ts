import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class DataService {

    path : String = 'http://localhost:3001/api/';

    constructor(private http:HttpClient) {}

    public getPermissions(permission, token) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: 'bearer ' + token
            })
          };
        return this.http.get(this.path+permission, httpOptions);
    }

    public getProfiles(profiles) {
        return this.http.get(this.path+profiles);
    }
}