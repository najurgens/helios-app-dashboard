import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service';

import { LoginComponent } from './layouts/auth/login.component';
import { Router, NavigationStart } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent { 
    title = 'Helios';
    opened = false;
    showMenus: Boolean;

    instanceUrl: String;
    user: Object;

    /*
    constructor(private authService:AuthService) {
        console.log('WITHIN APP COMPONENT CONSTRUCTOR');
        //console.log('auth result = ' + JSON.stringify(this.authService.authenticate('')));
    }
    */

    constructor(router:Router) {
        router.events.forEach((event) => {
            if(event instanceof NavigationStart) {
                this.showMenus = event.url !== "/login";
            }
        });
    }



}
