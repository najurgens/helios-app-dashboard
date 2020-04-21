import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service';

import { LoginComponent } from './layouts/auth/login.component';
import { Router, NavigationStart, RouterStateSnapshot } from '@angular/router';
import { AuthGuardService } from './services/auth-guard';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent { 

    title = 'Helios';
    opened = false;
    showMenus: Boolean;

    variant = 'circle';
    size = 'medium';
    src = 'assets/images/avatar1.jpg';

    setupOpen: Boolean = false;
    userSetupOpen: Boolean = false;
    

    constructor(private authService:AuthService, private router:Router, private authGuardService: AuthGuardService) {
        
        console.log(this.router.routerState.snapshot.url);
        console.log('isAuthenticated: ' + this.authService.isAuthenticated());
        router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                console.log('EVENT.RESTORED_STATE='+event);
                // if auth-guard has redirected to /login, showMenues===false
                console.log('APP COMPONENT ROUTER NAVIGATION DETECTED: authenticated: ' + this.authService.isAuthenticated());
                this.showMenus = (event.url !== "/login" && this.authService.isAuthenticated()===true);
                this.authGuardService.showMenusChange.subscribe((value) => this.showMenus = value);
            }
        });
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

}
