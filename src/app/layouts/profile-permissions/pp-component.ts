import { Component, OnInit } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
import { ActivatedRoute } from "@angular/router"; 

import { DataService } from '../../services/data-service';

@Component({
  selector: 'profiles-permissions',
  templateUrl: './pp-component.html',
  styleUrls: ['./pp-component.scss']
})
export class ProfilePermissionsComponent implements OnInit {

    tableHeaders:Array<String>;
    profiles:Array<any>;
    tableData:Array<any>;
    accessToken:String;
    instanceUrl:String;

    constructor(
        private dataService: DataService,
        private route: ActivatedRoute
        ) { console.log('ProfilePermissionsComponent contstructor called'); }

    ngOnInit() {
        console.log('PATH IN PROFILE-PERMISSIONS-COMPONENT: ' + this.dataService.path);
        this.dataService.profiles.subscribe(data=>{
            this.tableData = data;
            for(let i=0; i<this.tableData.length; i++) delete this.tableData[i].attributes;
            this.tableHeaders = Object.keys(this.tableData[0]);
        });
        $('.slds-is-active').removeClass("slds-is-active");
        $("#ProfilePermTab").addClass("slds-is-active");
    }

    onSort($event){
        console.log($event);
    }

    createCSV(data){
        const options = { 
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true, 
            showTitle: true,
            title: 'Profiles and Permissions',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
            // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
          };
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(this.tableData);
    }

}