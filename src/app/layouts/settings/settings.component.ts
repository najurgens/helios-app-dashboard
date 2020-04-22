import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';  
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../services/data-service';
import { isEmptyExpression } from '@angular/compiler';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

    myOrg: String;
    myUser: Object;

    systemPermissions: Map<String,Boolean>;
    userPermissions: Map<String,Boolean>;
    objectPermissions: Map<String,Boolean>;

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private dataService: DataService) {

            const auth = JSON.parse(sessionStorage.getItem('auth'));
            console.log('auth in settings: ' + auth);

            const accessToken = JSON.parse(auth).accessToken;
            console.log('settings accessToken = ' + accessToken);
            const instanceUrl = JSON.parse(auth).instanceUrl;
            console.log('settings instanceUrl = ' + instanceUrl);

            this.dataService.getProfiles('profiles', accessToken, instanceUrl).subscribe((profiles:Array<any>)=>{
              console.log('PROFILE IN SETTINGS: ' + JSON.stringify(profiles[0]));
              const arr = Object.keys(profiles[0]);
              console.log('KEYS: ' + arr);
            });

            /*
            this.dataService.getPermissions('permission-sets', accessToken, instanceUrl).subscribe((profiles:Array<any>)=>{
              console.log('PERMISSION SET IN SETTINGS: ' + JSON.stringify(profiles[0]));
            });
            */

            /*
            this.dataService.getProfileCrud('profile-crud-permissions', accessToken, instanceUrl).subscribe((profiles:Array<any>)=>{
              console.log('PROFILE CRUD PERMISSIONS IN SETTINGS: ' + JSON.stringify(profiles[0]));
            });

            this.dataService.getPermissionSetCrud('permission-set-crud-permissions', accessToken, instanceUrl).subscribe((profiles:Array<any>)=>{
              console.log('PERMISSION SET CRUD PERMISSIONS IN SETTINGS: ' + JSON.stringify(profiles[0]));
            });
            */

            /*
            this.dataService.getAllSObjects('getAllObjects', accessToken, instanceUrl).subscribe((profiles:Array<any>)=>{
              console.log('All SObjects in the org: ' + JSON.stringify(profiles[0]));
            })*/
    }

    populateSystemPermissions() {

    }

    populateUserPermissions() {

    }

    populateObjectPermissions() {
      this.objectPermissions.set('Create',false);
      this.objectPermissions.set('Read',false);
      this.objectPermissions.set('Edit',false);
      this.objectPermissions.set('Delete',false);
      this.objectPermissions.set('View All',false);
      this.objectPermissions.set('Modify All',false);
    }

}