import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    title: String = 'Helios';
    loginUrl: String;

    constructor(private authService:AuthService) {}

    authenticate() {
        window.location.href = 'http://localhost:3001/auth/login';
        /*this.loginUrl = (orgType==='prod') ? 'https://login.salesforce.com/' : 'https://test.salesforce.com/';
        this.authService.authenticate(this.loginUrl);
        console.log('auth result = ' + this.authService.authenticate('https://test.salesforce.com/'));
        console.log('within app.component.ts constructor!');*/
    }

    displayKey(){
        this.authService.displayKey();
    }
}