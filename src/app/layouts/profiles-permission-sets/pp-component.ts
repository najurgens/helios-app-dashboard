import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';  
import { ActivatedRoute } from '@angular/router';

import { DataService } from '../../services/data-service';

@Component({
  selector: 'profiles-permissions',
  templateUrl: './pp-component.html',
  styleUrls: ['./pp-component.scss']
})
export class ProfilePermissionSetComponent implements OnInit {

    accessToken: String;
    instanceUrl: String;
    refreshToken: String;
    user: Object;

    profiles:Array<any>
    permission_sets:Array<any>

    constructor(private authService: AuthService, private route: ActivatedRoute, private dataService: DataService) {

        console.log('Within profile-permissionSet constructor!');
        this.route.queryParams.subscribe(params => {
            console.log('WITHIN PROFILE PERMISSION SET, params= ' + JSON.stringify(params));
            if (params!={}) {
                const allParams = JSON.parse(params.valid);
                AuthService.currentUser = allParams['user'];
                AuthService.authenticated=true;
                this.accessToken = allParams['accessToken'];
                this.refreshToken = allParams['refreshToken'];
                this.instanceUrl = allParams['instanceUrl'];
                this.user = allParams['user'];
            }      
        });
        console.log('FINAL VALUES: ' + this.instanceUrl + ", " + JSON.stringify(this.user));
    }

    ngOnInit() {
        this.dataService.getProfiles('profiles').subscribe((profiles)=>{
            console.log(profiles);
        });

        this.dataService.getPermissions('permission-sets').subscribe((permissions)=>{
            console.log(permissions);
        });

    }

}