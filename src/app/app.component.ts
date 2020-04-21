import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthService } from './services/auth-service';
import { Location } from '@angular/common';

import { LoginComponent } from './layouts/auth/login.component';
import { Router, NavigationStart } from '@angular/router';

//Jquery
declare let $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent{ 

    title = 'Helios';
    opened = false;
    showMenus: Boolean;
    currentUrl: String;

    instanceUrl: String;
    user: Object;

    constructor(private authService:AuthService,
                private router:Router,
                private location: Location
                ) {
                this.currentUrl = this.location.path();
                this.showMenus = (this.currentUrl !== "/login");
                }

    ngAfterViewInit(){
        console.log(this.currentUrl);
        switch (this.currentUrl){
            case '/':
                $("#homeTab").addClass("slds-is-active");
                break;
            case '/profiles-permissions':
                console.log('profile case');
                console.log($("#ProfilePermTab"));
                $("#ProfilePermTab").addClass("slds-is-active");
                break;
            case '/permission-set-permissions':
                $("#PermSetPermTab").addClass("slds-is-active");
                break;
            case '/profile-crud-permissions':
                $("#ProfileCrudTab").addClass("slds-is-active");
                break;
            case '/permission-set-crud-permissions':
                $("#PermSetCrudTab").addClass("slds-is-active");
        }
    }

}
