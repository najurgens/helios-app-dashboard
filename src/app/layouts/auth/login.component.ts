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

    authenticate(orgType) {
        //console.log('within authentication service, address=' + orgType + ', authenticated='+AuthService.authenticated+', currentUser='+JSON.stringify(AuthService.currentUser));
        this.loginUrl = (orgType==='prod') ? 'true' : 'false';
        console.log(this.loginUrl);
        window.location.href = 'http://localhost:3001/auth/login?org=' + this.loginUrl;
    }

    /*
    displayKey(){
        this.authService.displayKey();
    }
    */
}