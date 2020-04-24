import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthService } from './services/auth-service';
import { Location } from '@angular/common';

import { LoginComponent } from './layouts/auth/login.component';
import { Router, NavigationStart } from '@angular/router';
import { DataService } from './services/data-service';

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
                private location: Location,
                private dataService: DataService,
                ) {
                this.currentUrl = this.location.path();
                this.showMenus = (this.currentUrl !== "/login");
                }

    ngOnInit(){
        if(this.authService.isAuthenticated()){
            console.log('pass');
            this.dataService.getAllData();
        }
    }

    ngAfterViewInit(){
        
    }

}
