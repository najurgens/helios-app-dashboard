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

    tableHeaders:Array<String>;
    profiles:Array<any>;
    tableData:Array<any>;
    accessToken:String;
    instanceUrl:String;

    constructor(
        private authService: AuthService, 
        private router: Router, private route: 
        ActivatedRoute, private dataService: DataService) 
        {

        console.log('Within profile-permissionSet constructor!');
        console.log('isAuthenticated: ' + this.authService.isAuthenticated());
        //console.log('AUTH-GUARD refreshToken: ' + AuthService.refreshToken + ', accessToken: ' + AuthService.accessToken + ', user: ' + AuthService.currentUser + ', instanceUrl: ' + AuthService.instanceUrl);
        this.route.queryParams.subscribe(params => {
            if (JSON.stringify(params)!=='{}') {
                const allParams = JSON.parse(params.auth);
                const authObj = { currentUser: allParams['user'], accessToken: allParams['accessToken'], refreshToken: allParams['refreshToken'], instanceUrl: allParams['instanceUrl'] };
                sessionStorage.setItem('auth', JSON.stringify(authObj));
            } else {
                //this.router.navigate(['/login']);
            }
        });
    }

    ngOnInit() {
        this.accessToken = JSON.parse(sessionStorage.getItem('auth')).accessToken;
        this.instanceUrl = JSON.parse(sessionStorage.getItem('auth')).instanceUrl;

        this.dataService.getProfiles('profiles', this.accessToken, this.instanceUrl).subscribe((profiles:Array<any>)=>{
            console.log('PROFILES FROM DATA SERVICE: ' + profiles);
            console.log(profiles);
        });

        this.dataService.getPermissions('permission-sets', this.accessToken, this.instanceUrl).subscribe((permissions:Array<any>)=>{
            console.log('PERMISSIONS FROM DATA SERVICE: ' + permissions);
            console.log(permissions);
            this.tableData = permissions;
            this.tableHeaders = Object.keys(this.tableData[0]);
        });
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