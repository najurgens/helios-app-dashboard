import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AuthService } from './services/auth-service';
import { Location } from '@angular/common';

import { LoginComponent } from './layouts/auth/login.component';
import { Router, NavigationStart, RouterStateSnapshot } from '@angular/router';
import { AuthGuardService } from './services/auth-guard';

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
    

    constructor(private authService:AuthService, private router:Router, private location: Location, private authGuardService: AuthGuardService) {
        
        this.currentUrl = this.location.path();
        this.showMenus = (this.currentUrl !== "/login");
        /*console.log(this.router.routerState.snapshot.url);
        console.log('isAuthenticated: ' + this.authService.isAuthenticated());
        router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                console.log('EVENT.RESTORED_STATE='+event);
                // if auth-guard has redirected to /login, showMenues===false
                console.log('APP COMPONENT ROUTER NAVIGATION DETECTED: authenticated: ' + this.authService.isAuthenticated());
                this.showMenus = (event.url !== "/login" && this.authService.isAuthenticated()===true);
                this.authGuardService.showMenusChange.subscribe((value) => this.showMenus = value);
            }
        });*/
    }

    navigateToSettings() {
        this.router.navigate(['/settings']);
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
