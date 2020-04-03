import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    title = 'Helios';

    constructor(private authService:AuthService) {}

    authenticate() {
        console.log('auth result = ' + this.authService.authenticate());
        console.log('within app.component.ts constructor!');
    }
}