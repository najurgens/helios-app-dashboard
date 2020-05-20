import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service';  
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../../services/data-service';
import { isEmptyExpression } from '@angular/compiler';
import { AccountService } from 'src/app/services/account-service';

@Component({
  selector: 'system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.scss']
})
export class SystemSettingsComponent {

    myOrg: String;
    myUser: Object;

    userPermissions: Object = {};
    userPermissionsKeys: Array<String>;
    userPermissionsKeysA: Array<String>;
    userPermissionsKeysB: Array<String>;

    objectPermissions: Object = {};
    objectPermissionsKeys: any;

    systemPermissions: Object = {};
    systemPermissionsKeys: Array<String>;
    systemPermissionsKeysA: Array<String>;
    systemPermissionsKeysB: Array<String>;

    constructor(private authService: AuthService, private router: Router,
      private route: ActivatedRoute, private dataService: DataService, private accountService: AccountService) {

      this.accountService.keyPermissions.subscribe((permissions) => {
        console.log('permissions: ' + JSON.stringify(permissions));
        console.log('permissions[key]: ' + permissions['PermissionsViewAllUsers']);
        //this.systemPermissions = permissions;
        this.systemPermissions = new Object(permissions);
        console.log('System permissions: ' + JSON.stringify(this.systemPermissions));
        this.userPermissions['PermissionsViewAllUsers'] = permissions['PermissionsViewAllUsers'];
        delete this.systemPermissions['PermissionsViewAllUsers'];
        console.log('userPermissions[key] = ' + this.userPermissions['PermissionsViewAllUsers']);
        this.userPermissions['PermissionsAssignPermissionSets'] = permissions['PermissionsAssignPermissionSets'];
        delete this.systemPermissions['PermissionsAssignPermissionSets'];
        this.userPermissions['PermissionsManageInternalUsers'] = permissions['PermissionsManageInternalUsers'];
        delete this.systemPermissions['PermissionsManageInternalUsers'];
        this.userPermissions['PermissionsManageIpAddresses'] = permissions['PermissionsManageIpAddresses'];
        delete this.systemPermissions['PermissionsManageIpAddresses'];
        this.userPermissions['PermissionsManageLoginAccessPolicies'] = permissions['PermissionsManageLoginAccessPolicies'];
        delete this.systemPermissions['PermissionsManageLoginAccessPolicies'];
        this.userPermissions['PermissionsManagePasswordPolicies'] = permissions['PermissionsManagePasswordPolicies'];
        delete this.systemPermissions['PermissionsManagePasswordPolicies'];
        this.userPermissions['PermissionsManageRoles'] = permissions['PermissionsManageRoles'];
        delete this.systemPermissions['PermissionsManageRoles'];
        this.userPermissions['PermissionsManageSharing'] = permissions['PermissionsManageSharing'];
        delete this.systemPermissions['PermissionsManageSharing'];
        this.userPermissions['PermissionsManageUsers'] = permissions['PermissionsManageUsers'];
        delete this.systemPermissions['PermissionsManageUsers'];
        this.userPermissions['PermissionsViewAllUsers'] = permissions['PermissionsViewAllUsers'];
        delete this.systemPermissions['PermissionsViewAllUsers'];
        this.userPermissions['PermissionsResetPasswords'] = permissions['PermissionsResetPasswords'];
        delete this.systemPermissions['PermissionsResetPasswords'];
        console.log('system Permissions: ' + JSON.stringify(this.systemPermissions));
        console.log('user Permissions: ' + JSON.stringify(this.userPermissions));
      });

      this.accountService.keyObjectsSource.asObservable().subscribe(objects => {
        console.log('objects: ' + JSON.stringify(objects));
        this.objectPermissions = objects;
        console.log('object Permissions: ' + JSON.stringify(this.objectPermissions));
      });

      this.userPermissionsKeys = Object.keys(this.userPermissions);
      console.log('userPermissionsKeys: ' + this.userPermissionsKeys);
      this.systemPermissionsKeys = Object.keys(this.systemPermissions);
      const len = this.userPermissionsKeys.length, len2 = this.systemPermissionsKeys.length;
      console.log('len = ' + len + ', len2 = ' + len2);
      console.log("1: A = " + this.userPermissionsKeysA + " B = " + this.userPermissionsKeysB);
      
      this.userPermissionsKeysA = this.userPermissionsKeys.slice(0,len/2);
      this.userPermissionsKeysB = this.userPermissionsKeys.slice(len/2, len);
      console.log("2: A = " + this.userPermissionsKeysA + " B = " + this.userPermissionsKeysB);
      this.systemPermissionsKeysA = this.systemPermissionsKeys.slice(0,len2/2);
      this.systemPermissionsKeysB = this.systemPermissionsKeys.slice(len2/2, len2);

      console.log("3: A = " + this.userPermissionsKeysA + " B = " + this.userPermissionsKeysB);
    }

    // delete duplicate keys from 2nd object
    intersectJSON(a:Object, b:Object) {
      Object.keys(a).forEach((key) => {
        if (typeof(b[key])!==undefined) delete b[key];
      });
      return b;
    }

    toggleSystemsPermissions(permission) {
      alert('toggleValue() ' + permission);
      this.systemPermissions[permission] = !this.systemPermissions[permission];
    }

    toggleUserPermissions(permission) {
      this.userPermissions[permission] = !this.userPermissions[permission];
    }

    saveSettings() {
      const authGov = JSON.parse(JSON.parse(sessionStorage.getItem('auth')));

      const permissions = {
        ...this.systemPermissions,
        ...this.userPermissions
      }

      const settings = {
        OrgId: authGov.user.organizationId,
        keyPermissions: JSON.stringify(permissions),
        //keyObjects: JSON.stringify(this.objectPermissions)
      }

      this.accountService.saveSystemSettings('saveSystemSettings', authGov.authGovAccessToken, authGov.authGovInstanceUrl, settings).subscribe((resp)=>console.log(resp));
    }

}