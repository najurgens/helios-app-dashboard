import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tokenName } from "@angular/compiler";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { AuthService } from "./auth-service";
import { AccountService } from "./account-service";

@Injectable({
  providedIn: "root",
})
export class DataService {
  path: String = "http://localhost:3001/api/";

  private profileSource = new BehaviorSubject({
    tableData: [],
    tableHeaders: [],
  });
  profiles = this.profileSource.asObservable();

  private permissionSetSource = new BehaviorSubject({
    tableData: [],
    tableHeaders: [],
  });
  permissionSets = this.permissionSetSource.asObservable();

  private profileCrudSource = new BehaviorSubject([]);
  profileCrud = this.profileCrudSource.asObservable();

  private permissionSetCrudSource = new BehaviorSubject([]);
  permissionSetCrud = this.permissionSetCrudSource.asObservable();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private accountService: AccountService
  ) {}

  public getAllData() {
    this.getProfiles("profiles");
    this.getPermissions("permission-sets");
    this.getProfileCrud("profile-crud-permissions");
    this.getPermissionSetCrud("permission-set-crud-permissions");
    this.accountService.refreshAccountInformation("account");
  }

  public getPermissions(data) {
    const authObj = JSON.parse(sessionStorage.getItem("auth"));
    const token = JSON.parse(authObj).accessToken;
    const url = JSON.parse(authObj).instanceUrl;
    console.log(token);
    console.log(url);
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        InstanceUrl: url,
      }),
      withCredentials: true,
    };
    console.log(httpOptions);
    this.http.get<any>(this.path + data, httpOptions).subscribe((data) => {
      for (let i = 0; i < data.length; i++) delete data[i].attributes;
      const permissionData = {
        tableData: data,
        tableHeaders: Object.keys(data[0]),
      };
      this.permissionSetSource.next(permissionData);
    });
  }

  public getProfiles(data) {
    const authObj = JSON.parse(sessionStorage.getItem("auth"));
    const token = JSON.parse(authObj).accessToken;
    const url = JSON.parse(authObj).instanceUrl;
    console.log("TOKEN IN DATA-SERVICE: " + token);
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        instanceUrl: url,
      }),
      withCredentials: true,
    };
    this.http.get<any>(this.path + data, httpOptions).subscribe((data) => {
      for (let i = 0; i < data.length; i++) delete data[i].attributes;
      const profileData = {
        tableData: data,
        tableHeaders: Object.keys(data[0]),
      };
      this.profileSource.next(profileData);
    });
  }

  public getProfileCrud(data) {
    const authObj = JSON.parse(sessionStorage.getItem("auth"));
    const token = JSON.parse(authObj).accessToken;
    const url = JSON.parse(authObj).instanceUrl;
    console.log("TOKEN IN DATA-SERVICE: " + token);
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        instanceUrl: url,
      }),
      withCredentials: true,
    };
    this.http
      .get<any>(this.path + data, httpOptions)
      .subscribe((data) => this.profileCrudSource.next(data));
  }

  public getPermissionSetCrud(data) {
    const authObj = JSON.parse(sessionStorage.getItem("auth"));
    const token = JSON.parse(authObj).accessToken;
    const url = JSON.parse(authObj).instanceUrl;
    console.log("TOKEN IN DATA-SERVICE: " + token);
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
        instanceUrl: url,
      }),
      withCredentials: true,
    };
    this.http
      .get<any>(this.path + data, httpOptions)
      .subscribe((data) => this.permissionSetCrudSource.next(data));
  }

  private handleError<Any>(operation, result?: Any) {
    return (error: Any): Observable<Any> => {
      console.error(`${operation} failed: ` + error);
      this.authService.isAuth.next(false);
      sessionStorage.removeItem("auth");
      this.authService.showMenu.next(false);
      this.router.navigate(["/login"]);

      // call function to display toast here
      // displayReAuthToast();
      return of(result as Any);
    };
  }
}
