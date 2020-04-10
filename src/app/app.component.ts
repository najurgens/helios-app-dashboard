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
    

    constructor(private authService:AuthService, private router:Router) {
        
        console.log('isAuthenticated: ' + this.authService.isAuthenticated());
        router.events.forEach((event) => {
            if (event instanceof NavigationStart) {
                console.log('EVENT.RESTORED_STATE='+event);
                // if auth-guard has redirected to /login, showMenues===false
                console.log('APP COMPONENT ROUTER NAVIGATION DETECTED: authenticated: ' + this.authService.isAuthenticated());
                //this.showMenus = this.authService.isAuthenticated();
                this.showMenus = (event.url !== "/login" && this.authService.isAuthenticated()===true);
            }
        });
    }

    navigateToSettings() {
        this.router.navigate(['/settings']);
    }

    navigateToProfile() {
        this.router.navigate(['/profile']);
    }

    switchMenuState(state: Boolean) {
        console.log('WITHIN switchMenuState() ON APP-COMPONENT');
        this.showMenus = state;
    }



}
