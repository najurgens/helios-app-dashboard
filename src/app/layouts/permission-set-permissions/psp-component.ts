import { Component, OnInit } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';

import { DataService } from '../../services/data-service';
import { isEmptyExpression } from '@angular/compiler';

@Component({
  selector: 'permission-set-permissions',
  templateUrl: './psp-component.html',
  styleUrls: ['./psp-component.scss']
})
export class PermissionSetPermissionsComponent implements OnInit {

    tableHeaders:Array<String>;
    permissions:Array<any>;
    tableData:Array<any>;
    accessToken:String;
    instanceUrl:String;

    constructor(
        private dataService: DataService) 
        {}

    ngOnInit() {
        this.accessToken = JSON.parse(sessionStorage.getItem('auth')).accessToken;
        this.instanceUrl = JSON.parse(sessionStorage.getItem('auth')).instanceUrl;
        this.dataService.getPermissions('permission-sets', this.accessToken, this.instanceUrl).subscribe((permissions:Array<any>)=>{
            this.tableData = permissions;
            for(let i=0; i<this.tableData.length; i++) delete this.tableData[i].attributes;
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
        csvExporter.generateCsv(this.tableData);
    }

}