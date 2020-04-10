import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';  
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../services/data-service';
import { isEmptyExpression } from '@angular/compiler';

@Component({
  selector: 'profiles-permissions',
  templateUrl: './pp-component.html',
  styleUrls: ['./pp-component.scss']
})
export class ProfilePermissionSetComponent implements OnInit {

    profiles:Array<any>
    permission_sets:Array<any>

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private dataService: DataService) {

        console.log('Within profile-permissionSet constructor!');
        console.log('isAuthenticated: ' + this.authService.isAuthenticated());
        //console.log('AUTH-GUARD refreshToken: ' + AuthService.refreshToken + ', accessToken: ' + AuthService.accessToken + ', user: ' + AuthService.currentUser + ', instanceUrl: ' + AuthService.instanceUrl);
        /*this.route.queryParams.subscribe(params => {
            //console.log('WITHIN PROFILE PERMISSION SET, params= ' + JSON.stringify(params));
            if (JSON.stringify(params)!=='{}') {
                //console.log('VALID PARAMS PERMPROF');
                const allParams = JSON.parse(params.auth);
                const authObj = { currentUser: allParams['user'], accessToken: allParams['accessToken'], refreshToken: allParams['refreshToken'], instanceUrl: allParams['instanceUrl'] };
                //console.log('SETTING...');
                sessionStorage.setItem('auth', JSON.stringify(authObj));
                //console.log('GETTING...');
                console.log(sessionStorage.getItem('auth'));
                //console.log('IS-AUTH SHOULD BE TRUE HERE: ' + this.authService.isAuthenticated());
            }
        });*/
    }

    ngOnInit() {
        this.dataService.getAccounts('accounts').subscribe((data) => {
            console.log('Accounts RETRIEVED: ' + data);
        })
    }

}