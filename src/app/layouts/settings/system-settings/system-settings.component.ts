import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service';  
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../../services/data-service';
import { isEmptyExpression } from '@angular/compiler';

@Component({
  selector: 'system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.scss']
})
export class SystemSettingsComponent {

    myOrg: String;
    myUser: Object;

    userPermissions: Map<String,Object>;
    userPermissionsProfileSettings: Array<String>;
    userPermissionsPermissionSetSettings: Array<String>;

    objectPermissions: Map<String,Boolean>;

    systemPermissions: Map<String,Object>;
    profile: Object;
    profileSettings: Array<String>;
    permissionSet: Object;
    permissionSetSettings: Array<String>;
    profileAndPermissionSetSettings: Object;

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private dataService: DataService) {

      this.userPermissions = new Map<String,Object>();
      this.objectPermissions = new Map<String,Boolean>();
      this.systemPermissions = new Map<String,Object>();
      let profileKeys = {}, permissionSetKeys = {};

      this.dataService.profiles.subscribe(profiles => {
          profileKeys = profiles[0];
          this.dataService.permissionSets.subscribe(permissionSets => {
            permissionSetKeys = permissionSets[0];
            this.profileAndPermissionSetSettings = {...profileKeys, ...this.intersectJSON(profileKeys, permissionSetKeys)};
                     
            this.loadSystemPermissions('Profile-PermissionSet',this.profileAndPermissionSetSettings);
        });
      });

      

      this.loadUserPermissions();
      this.userPermissionsProfileSettings = Object.keys(this.userPermissions.get('Profile'));
      this.userPermissionsPermissionSetSettings = Object.keys(this.userPermissions.get('Permission-Set'));
    }

    // delete duplicate keys from 2nd object
    intersectJSON(a:Object, b:Object) {
      Object.keys(a).forEach((key) => {
        if (typeof(b[key])!==undefined) delete b[key];
      });
      return b;
    }

    // loads default settings into map
    // step 2: API call to extract settings from DB and populate map
    populateObjectPermissions() {
      this.objectPermissions.set('Create',false);
      this.objectPermissions.set('Read',false);
      this.objectPermissions.set('Edit',false);
      this.objectPermissions.set('Delete',false);
      this.objectPermissions.set('View All',false);
      this.objectPermissions.set('Modify All',false);
    }

    // extracts user permissions from JSON and loads into a map
    // step 2 : API call to extract settings and populate map
    loadUserPermissions() {
      this.userPermissions.set("Profile", {'PermissionsViewAllUsers':false});
      this.userPermissions.set('Permission-Set', {'PermissionsAssignPermissionSets':false, 'PermissionsManageInternalUsers':false, 
        'PermissionsManageIpAddresses':false, 'PermissionsManageLoginAccessPolicies':false, 'PermissionsManagePasswordPolicies':false, 
        'PermissionsManageRoles':false, 'PermissionsManageSharing': false, 'PermissionsManageUsers': false, 
        'PermissionsViewAllUsers':false, 'PermissionsResetPasswords':false});
      console.log('userPermissions Map : ');
      this.userPermissions.forEach((value: Object, key: String) => {
          console.log(key, value);
      });
    }

    // loads JSON system permissions as a key into a map
    // step 2 : API call to extract settings and populate map
    loadSystemPermissions(key,value) {
      this.systemPermissions.set(key,value);
    }

    loadObjectPermissions() {
      //this.objectPermissions.set('Profile', "");
    }

    // remove unnecessary fields from profiles & permission sets
    removeFields() {
      delete this.profile["Id"];
      delete this.profile["Name"];
      delete this.profile["attributes"];
      delete this.profile["SystemModstamp"];
      delete this.profile["UserLicenseId"];
      delete this.profile["UserType"];

      delete this.permissionSet["attributes"];
      delete this.permissionSet["Id"];
      delete this.permissionSet["Label"];
    }

}