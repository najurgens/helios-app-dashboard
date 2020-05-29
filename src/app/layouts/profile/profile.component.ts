import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';  
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../services/data-service';
import { isEmptyExpression } from '@angular/compiler';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

    myOrg: String;
    myUser: Object;

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {

            const auth = JSON.parse(sessionStorage.getItem('auth'));
            console.log('IN PROFILE COMPONENT: auth.instanceUrl='+auth.instanceUrl + ', auth.myUser=' + JSON.stringify(auth.user));
            this.myOrg = auth.instanceUrl;
            this.myUser = auth.user;

    }

}