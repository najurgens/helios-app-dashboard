import { Component, OnInit } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';

import { DataService } from '../../services/data-service';
import { isEmptyExpression } from '@angular/compiler';

@Component({
  selector: 'profile-crud-permissions',
  templateUrl: './pcp-component.html',
  styleUrls: ['./pcp-component.scss']
})
export class ProfileCrudPermissionsComponent implements OnInit {

    tableHeaders:Array<String> = [];
    tableData:Array<any> = [];
    crudObj:Object = {profileName : ""};
    accessToken:String;
    instanceUrl:String;

    constructor(
        private dataService: DataService) 
        {}

    ngOnInit() {
        this.dataService.profileCrud.subscribe(data=>{
            this.getTableHeaders(data);
            this.getTableData(data);
        });
        $('.slds-is-active').removeClass("slds-is-active");
        $("#ProfileCrudTab").addClass("slds-is-active");
    }

    getTableHeaders(permissions){
        for(let i=0; i<permissions.length; i++){
            if(!this.tableHeaders.includes(permissions[i].SobjectType)){
                this.tableHeaders.push(permissions[i].SobjectType);
                this.crudObj[permissions[i].SobjectType] = '';
            }
        }
    }

    getTableData(permissions){
        let currentObj = {...this.crudObj};
            for(let j=0; j<permissions.length; j++){
                let crud = '';
                if(permissions[j].PermissionsCreate) crud +='C';
                if(permissions[j].PermissionsRead) crud +='R';
                if(permissions[j].PermissionsEdit) crud +='E';
                if(permissions[j].PermissionsDelete) crud +='D';
                if(permissions[j].PermissionsViewAllRecords) crud +='V';
                if(permissions[j].PermissionsModifyAllRecords) crud +='M';
                if(j===0){
                    currentObj['profileName'] = permissions[j].Parent.Profile.Name;
                    currentObj[permissions[j].SobjectType] = crud;
                }else if(permissions[j].Parent.Profile.Name===permissions[j-1].Parent.Profile.Name){
                    currentObj[permissions[j].SobjectType] = crud;
                }else{
                    this.tableData.push(currentObj);
                    currentObj = {...this.crudObj};
                    currentObj['profileName'] = permissions[j].Parent.Profile.Name;
                    currentObj[permissions[j].SobjectType] = crud;
                }
            }
            this.tableData.push(currentObj);
    }

    createCSV(data){
        const options = { 
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true, 
            showTitle: true,
            title: 'Profile CRUD Access',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
            // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
          };
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(this.tableData);
    }

}