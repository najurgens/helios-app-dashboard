import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service';  
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../../services/data-service';
import { isEmptyExpression } from '@angular/compiler';
import { AccountService } from 'src/app/services/account-service';

@Component({
  selector: 'object-settings',
  templateUrl: './object-settings.component.html',
  styleUrls: ['./object-settings.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})
export class ObjectSettingsComponent implements OnInit {

    myOrg: String;
    myUser: Object;

    availableObjects: {};
    availableObjectsList: Array<string> = [];
    assignedObjects: {};
    assignedObjectsList: Array<string> = [];

    availablePermissionsList: Array<string> = [];
    keyPermissionsList: Array<string> = [];

    Object = Object;

    constructor(private authService: AuthService, private router: Router,
      private route: ActivatedRoute, private dataService: DataService, private accountService: AccountService) {
    }

    ngOnInit() {
      this.accountService.keyObjectsSource.asObservable().subscribe(objects => {
        console.log('OBJECTS: ' + JSON.stringify(objects));
        if (JSON.stringify(objects)==='{}') {
          console.log('null SUB');
          const authString = JSON.parse(sessionStorage.getItem('auth'));
          console.log('in getAllData from dataService within object-settings, authString = ' + authString);
          console.log('authString.user.orgId = ' + JSON.stringify(JSON.parse(authString).user.organizationId));
          this.dataService.getAllData();
        // need to wait for assignedObjects to populate before calling getAllObjects(objects)
        } else {
          console.log('data SUB, objects = ' + JSON.stringify(objects));
          this.assignedObjects = this.sortObject(objects);
          this.availableObjects = {};
          this.getAllObjects(objects);
          this.availableObjectsList = Object.keys(this.availableObjects);
          this.assignedObjectsList = Object.keys(this.assignedObjects);
          console.log('assigned list: ' + JSON.stringify(this.assignedObjectsList) + ' available list: ' + JSON.stringify(this.availableObjectsList));
          console.log('assigned: ' + JSON.stringify(this.assignedObjects) + ' available: ' + JSON.stringify(this.availableObjects));
        }
      });
    }

    getAllObjects(obj) {
      console.log('obj = ' + obj);
      this.dataService.profileCrud.subscribe(data=>{
        if (JSON.stringify(data)!=='[]') {
          console.log('in getAllObjects, settings, profileCRUD, objects = ' + JSON.stringify(data));
          console.log('SObject: ' + JSON.stringify(data[0].SobjectType));
          for (let permission of data) if (this.assignedObjects[permission.SobjectType]===undefined) this.availableObjects[permission.SobjectType] = [0,0,0,0,0,0];
        }
      });
    }

    // delete duplicate keys from 2nd object
    intersectJSON(a:Object, b:Object) {
      Object.keys(a).forEach((key) => {
        if (typeof(b[key])!==undefined) delete b[key];
      });
      return b;
    }

    // pushes settings to the DB
    saveSettings() {
      const authGov = JSON.parse(JSON.parse(sessionStorage.getItem('auth')));

      const settings = {
        OrgId: authGov.user.organizationId,
        keyObjects: JSON.stringify(this.assignedObjects)
      }

      this.accountService.saveSystemSettings('saveObjectSettings', authGov.authGovAccessToken, authGov.authGovInstanceUrl, settings).subscribe((resp)=>console.log(resp));
    }

    // moves selected objects into key objects section
    shiftSelectedObjectsRight() {

      const assignObjects = (key) => {
        this.assignedObjects[key] = [0,0,0,0,1,1];
        const assignedObjects = this.assignedObjects;
        const sortedObjects = {};
        Object.keys(this.assignedObjects).sort().forEach(function(key) {
          sortedObjects[key] = assignedObjects[key];
        });
        this.assignedObjects = sortedObjects;
      }

      const removeFromAvailableObjects = (key) => delete this.availableObjects[key];

      $('#availableObjects li div[aria-selected|="true"]').each(function() {
        //alert($(this));
        const key = $(this).attr('value');
        //alert(key);
        assignObjects(key);
        removeFromAvailableObjects(key);
      });

    }

    // moves selected objects out of key objects section
    shiftSelectedObjectsLeft() {
      
      const unassignObjects = (key) => {
        this.availableObjects[key] = [0,0,0,0,1,1];
        const unassignedObjects = this.availableObjects;
        const sortedObjects = {};
        Object.keys(this.availableObjects).sort().forEach(function(key) {
          sortedObjects[key] = unassignedObjects[key];
        });
        this.availableObjects = sortedObjects;
      }

      const removeFromAssignedObjects = (key) => delete this.assignedObjects[key];

      const aList = this.availablePermissionsList;
      const bList = this.keyPermissionsList;

      $('#keyObjects li div[aria-selected|="true"]').each(function() {
        //alert($(this));
        const key = $(this).attr('value');
        //alert(key);
        unassignObjects(key);
        removeFromAssignedObjects(key);
        if (key==$('#combobox-id-4').attr('value')) {
          $('#combobox-id-4').attr('value','');
          aList.length=0;
          bList.length=0;
        }

      });

      // check if picklist has any of these values selected, if it does, picklist set to 'none selected', and dueling permissions lists are cleared
    }

    // displays permissions of a key object in second list
    showPermissions(event) {

      const key = $(event.target).closest("div").attr("value");
      //alert(key);
      let permissionsList = this.assignedObjects[key];
      //alert(permissionsList);

    }

    // toggle list item as selected or un-selected.
    toggleSelected(event) {
      const state = ($(event.target).closest("div").attr("aria-selected")==="true") ? "false" : "true";
      $(event.target).closest("div").attr("aria-selected", state);
    } 

    togglePicklist() {
      const state = $("#keyObjectsPicklist").attr("aria-expanded");
      state=="true" ? this.compressPicklist() : this.expandPicklist();
    }

    expandPicklist() {
      $("#keyObjectsPicklist").attr("aria-expanded", "true");
      $("#keyObjectsPicklist").addClass("slds-is-open");
    }

    compressPicklist() {
      $("#keyObjectsPicklist").attr("aria-expanded", "false");
      $("#keyObjectsPicklist").removeClass("slds-is-open");
    }

    onClick(event) {
      //if ()
    }

    selectPicklistOption(event) {
      $("#listbox-id-4").find('*').removeClass("slds-is-selected");
      const option = ($(event.target).closest("div").attr("value"));
      ($(event.target).closest("div").addClass("slds-is-selected"));
      $("#combobox-id-4").attr("value", option);
      this.parseArrayIntoPermissions(this.assignedObjects[option]);
    }

    parseArrayIntoPermissions(permissions: Array<Number>) {
      let keyPermissions: Array<string> = [];
      let nonKeyPermissions: Array<string> = [];
      permissions[0]==1 ? keyPermissions.push("Create") : nonKeyPermissions.push("Create");
      permissions[1]==1 ? keyPermissions.push("Read") : nonKeyPermissions.push("Read");
      permissions[2]==1 ? keyPermissions.push("Edit") : nonKeyPermissions.push("Edit");
      permissions[3]==1 ? keyPermissions.push("Delete") : nonKeyPermissions.push("Delete");
      permissions[4]==1 ? keyPermissions.push("View All") : nonKeyPermissions.push("View All");
      permissions[5]==1 ? keyPermissions.push("Modify All") : nonKeyPermissions.push("Modify All");
      this.availablePermissionsList = nonKeyPermissions;
      this.keyPermissionsList = keyPermissions;
    }

    // moves permissions into key section
    shiftPermissionsRight() {

      const assignPermissions = (key) => this.keyPermissionsList.push(key);
      const removeFromAvailablePermissions = (key) => this.availablePermissionsList.splice(this.availablePermissionsList.indexOf(key),1);
      const arp = this.assignOrRemovePermissionFromMap;

      const ao = this.assignedObjects;
      const obj = $("#combobox-id-4").attr("value");

      $('#nonKeyPermissions li div[aria-selected|="true"]').each(function() {
        const key = $(this).attr('value');
        arp(obj, key, true, ao);
        assignPermissions(key);
        removeFromAvailablePermissions(key);
      });

    }

    // moves permissions out of key section
    shiftPermissionsLeft() {
      
      const unassignPermissions = (key) => this.availablePermissionsList.push(key);
      const removeFromAssignedPermissions = (key) => this.keyPermissionsList.splice(this.keyPermissionsList.indexOf(key),1);
      const arp = this.assignOrRemovePermissionFromMap;

      const ao = this.assignedObjects;
      const obj = $("#combobox-id-4").attr("value");

      $('#keyPermissions li div[aria-selected|="true"]').each(function() {
        const key = $(this).attr('value');
        arp(obj, key, false, ao);
        unassignPermissions(key);
        removeFromAssignedPermissions(key);
      });
    }

    // searches for the exact permission in the map, and removes it.
    assignOrRemovePermissionFromMap(keyObject: string, permission: string, assign: boolean, assignedObjects: Object) {
      if (assign) {
        switch (permission) {
          case "Create":
            assignedObjects[keyObject][0]=1; break;
          case "Read":
            assignedObjects[keyObject][1]=1; break;
          case "Edit":
            assignedObjects[keyObject][2]=1; break;
          case "Delete":
            assignedObjects[keyObject][3]=1; break;
          case "View All":
            assignedObjects[keyObject][4]=1; break;
          case "Modify All":
            assignedObjects[keyObject][5]=1; break;
        }
      } else {
        switch (permission) {
          case "Create":
            assignedObjects[keyObject][0]=0; break;
          case "Read":
            assignedObjects[keyObject][1]=0; break;
          case "Edit":
            assignedObjects[keyObject][2]=0; break;
          case "Delete":
            assignedObjects[keyObject][3]=0; break;
          case "View All":
            assignedObjects[keyObject][4]=0; break;
          case "Modify All":
            assignedObjects[keyObject][5]=0; break;
        }
      }
    } 

    sortObject = (obj: Object): Object =>  {
      const sortedObject = {};
      Object.keys(obj).sort().forEach(function(key) {
        sortedObject[key] = obj[key];
      });
      return sortedObject;
    }
    

}