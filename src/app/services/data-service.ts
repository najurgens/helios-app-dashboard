import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn:'root'
})
export class DataService {

    path: 'http://localhost:3001/api/';

    constructor(private httpClient:HttpClient) {}

    public getPermissions(permission) {
        return this.httpClient.get(this.path+permission);
    }
}