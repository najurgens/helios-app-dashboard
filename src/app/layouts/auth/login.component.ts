import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { ActivatedRoute, Router, NavigationEnd, RouterStateSnapshot } from '@angular/router';
import { Location } from '@angular/common';

import { AppComponent } from '../../app.component';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    title: String = 'Helios';
    loginUrl: String;

    @Input() showMenus: Boolean;
    @Output() showMenusStateChange = new EventEmitter<Boolean>();

    constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private location: Location ) {

        //console.log('AUTH-GUARD refreshToken: ' + AuthService.refreshToken + ', accessToken: ' + AuthService.accessToken + ', user: ' + AuthService.currentUser + ', instanceUrl: ' + AuthService.instanceUrl);
        if (this.authService.isAuthenticated()) {
            console.log('FROM LOGIN COMPONENT, ALREADY AUTHENTICATED!!!');
            this.router.navigate(['/profiles-permissions']);// this.location.back();
        }

        /*this.router.events.subscribe((event) => {
            // see also 
            console.log('router login val');
            if (event instanceof NavigationEnd) console.log('event.url: ' + event.url);
            //console.log(event instanceof NavigationEnd); 
        });*/

        /*this.router.events.subscribe((event) => {
            console.log('LOGIN STATE URL: ' + this.state.url);
        });*/
    }

    authenticate(orgType) {
        console.log('LOGIN AUTHENTICATE CALLED!');
        this.loginUrl = (orgType==='prod') ? 'true' : 'false';
        window.location.href = 'http://localhost:3001/auth/login?org=' + this.loginUrl;
        
        // change AppComponent state here
        console.log('EMITTING MENU STATE IN LOGIN ...');
        
        this.showMenusStateChange.emit(true);

    }
}