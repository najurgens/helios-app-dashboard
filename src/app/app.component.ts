import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service';

import { LoginComponent } from './layouts/auth/login.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { 
    title = 'Helios';
    opened = false;

  constructor(private authService:AuthService) {
      console.log('WITHIN APP COMPONENT CONSTRUCTOR');
      console.log('auth result = ' + JSON.stringify(this.authService.authenticate()));
  }

  ngOnInit() {
      console.log('TEST API CALL: ' + JSON.stringify(this.authService.getAccounts()));
  }



}
