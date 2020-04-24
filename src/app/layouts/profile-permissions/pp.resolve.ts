/*import { Injectable } from "@angular/core";  
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";  
import { Observable } from "rxjs";  
import { DataService } from "../../services/data-service";   
  
@Injectable()  
export class ProfilePermissionsResolve implements Resolve<any[]> {  
  constructor(private dataService: DataService) {}  
  
  resolve(route: ActivatedRouteSnapshot): Observable<any[]> {  
    const token = JSON.parse(sessionStorage.getItem('auth')).accessToken;
    const url = JSON.parse(sessionStorage.getItem('auth')).instanceUrl;
    return this.dataService.getProfiles('profiles', token, url);  
  }  
}  */