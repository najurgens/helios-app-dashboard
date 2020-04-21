import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    title: String = 'Helios';
    loginUrl: String;

    constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router, private location: Location ) {

        //console.log('AUTH-GUARD refreshToken: ' + AuthService.refreshToken + ', accessToken: ' + AuthService.accessToken + ', user: ' + AuthService.currentUser + ', instanceUrl: ' + AuthService.instanceUrl);
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/']);// this.location.back();
        }
    }

    authenticate(orgType) {
        this.loginUrl = (orgType==='prod') ? 'true' : 'false';
        window.location.href = 'http://localhost:3001/auth/login?org=' + this.loginUrl;
    }
}