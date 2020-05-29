import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthService } from './services/auth-service';
import { Location } from '@angular/common';

import { LoginComponent } from './layouts/auth/login.component';
import { Router, NavigationStart, RouterStateSnapshot } from '@angular/router';
import { AuthGuardService } from './services/auth-guard';
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

    variant = 'circle';
    size = 'medium';
    src = 'assets/images/avatar1.jpg';

    setupOpen: Boolean = false;
    userSetupOpen: Boolean = false;
    

    constructor(private authService:AuthService, private router:Router, private location: Location, private authGuardService: AuthGuardService, private dataService: DataService) { 
        this.currentUrl = this.location.path();
        console.log('currentUrl: ' + this.currentUrl);
        console.log('in appComponent, isAuthenticated() = ' + authService.isAuthenticated());
        this.authService.isAuth.subscribe((auth)=>{
            this.authService.showMenu.subscribe((state)=>{
                this.showMenus=((authService.isAuthenticated() || auth) && state);
            });
        });
    }

    receiveMenuState($event) {
        this.showMenus = $event
    }

    navigateToSettings() {
        this.router.navigate(['/system-settings']);
    }

    navigateToObjectSettings() {
        this.router.navigate(['/object-settings']);
    }

    navigateToProfile() {
        this.router.navigate(['/profile']);
    }

    toggleSetup() {
        document.getElementById('setupToggle').classList.toggle('slds-is-open');
        this.setupOpen = !this.setupOpen
        if (this.userSetupOpen===true) {
            document.getElementById('userSetupToggle').classList.toggle('slds-is-open');
            this.userSetupOpen = !this.userSetupOpen;
        }
    }

    toggleUserSetup() {
        document.getElementById('userSetupToggle').classList.toggle('slds-is-open');
        this.userSetupOpen = !this.userSetupOpen;
        if (this.setupOpen===true) {
            document.getElementById('setupToggle').classList.toggle('slds-is-open');
            this.setupOpen = !this.setupOpen;
        }
    }

    ngOnInit(){
        console.log('on init APP COMPONENT!');
    }

    ngAfterViewInit(){
        
    }

}
