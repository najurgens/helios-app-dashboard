import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';  
import { ExportToCsv } from 'export-to-csv';
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

    constructor(
        private authService: AuthService, 
        private router: Router, private route: 
        ActivatedRoute, private dataService: DataService) 
        {

        console.log('Within profile-permissionSet constructor!');
        console.log('isAuthenticated: ' + this.authService.isAuthenticated());
        //console.log('AUTH-GUARD refreshToken: ' + AuthService.refreshToken + ', accessToken: ' + AuthService.accessToken + ', user: ' + AuthService.currentUser + ', instanceUrl: ' + AuthService.instanceUrl);
        this.route.queryParams.subscribe(params => {
            console.log('WITHIN PROFILE PERMISSION SET, params= ' + JSON.stringify(params));
            if (JSON.stringify(params)!=='{}') {
                console.log('VALID PARAMS PERMPROF');
                const allParams = JSON.parse(params.auth);
                const authObj = { currentUser: allParams['user'], accessToken: allParams['accessToken'], refreshToken: allParams['refreshToken'], instanceUrl: allParams['instanceUrl'] };
                console.log('SETTING...');
                sessionStorage.setItem('auth', JSON.stringify(authObj));
                console.log('GETTING...');
                console.log(sessionStorage.getItem('auth'));
                /*
                AuthService.currentUser = allParams['user'];
                AuthService.accessToken = allParams['accessToken'];
                AuthService.refreshToken = allParams['refreshToken'];
                AuthService.instanceUrl = allParams['instanceUrl'];
                */
            } else {
                //this.router.navigate(['/login']);
            }
        });
    }

    ngOnInit() {
        //console.log('data-service call: ' + this.dataService.getProfiles('profiles'));
        //console.log('data-service call: ' + this.dataService.getPermissions('permission-sets'));
        /*this.dataService.getProfiles('profiles', AuthService.accessToken, AuthService.instanceUrl).subscribe((profiles)=>{
            console.log('PROFILES FROM DATA SERVICE: ' + profiles);
        });*/

        /*this.dataService.getPermissions('permission-sets', AuthService.accessToken, AuthService.instanceUrl).subscribe((permissions)=>{
            console.log('PERMISSIONS FROM DATA SERVICE: ' + permissions);
        });*/
    }
    
    createCSV(data){
        const options = { 
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true, 
            showTitle: true,
            title: 'My Awesome CSV',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
            // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
          };
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(data);
    }

}