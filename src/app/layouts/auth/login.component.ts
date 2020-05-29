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

        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/']);// this.location.back();
        }

        console.log('in loginComponent, isAuthenticated() = ' + authService.isAuthenticated());
        this.authService.isAuth.subscribe((auth)=>this.showMenusStateChange.emit((authService.isAuthenticated() || auth)));
        
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