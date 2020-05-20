import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data-service';

@Component({
  selector: 'permission-set-permissions',
  templateUrl: './psp-component.html',
  styleUrls: ['./psp-component.scss']
})
export class PermissionSetPermissionsComponent implements OnInit {

    tableHeaders:Array<string>;
    permissions:Array<any>;
    tableData:Array<any>;
    accessToken:string;
    instanceUrl:string;

    constructor(private dataService: DataService){}

    ngOnInit() {
        this.dataService.permissionSets.subscribe(data=>{
            if(data.tableData.length===0) this.dataService.getAllData();
            else{
                this.tableData = data.tableData;
                this.tableHeaders = data.tableHeaders;
            }
        });
        $('.slds-is-active').removeClass("slds-is-active");
        $("#PermSetPermTab").addClass("slds-is-active");
    }
}