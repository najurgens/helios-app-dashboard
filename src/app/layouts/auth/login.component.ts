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

    authenticate(address) {
        console.log('within authentication service, address=' + address + ', authenticated='+AuthService.authenticated+', currentUser='+JSON.stringify(AuthService.currentUser));
        this.authService.authenticate(address).subscribe((url) => {console.log('url returned: ' + JSON.stringify(url)); window.location.href = 'http://localhost:3001/auth/login'});
        //window.location.href = 'http://localhost:3001/auth/login';
        /*this.loginUrl = (orgType==='prod') ? 'https://login.salesforce.com/' : 'https://test.salesforce.com/';
        this.authService.authenticate(this.loginUrl);
        console.log('auth result = ' + this.authService.authenticate('https://test.salesforce.com/'));
        console.log('within app.component.ts constructor!');*/
    }

    /*
    displayKey(){
        this.authService.displayKey();
    }
    */
}