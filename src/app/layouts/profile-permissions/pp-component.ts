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
        ) {}

    ngOnInit() {
        this.dataService.profiles.subscribe(data=>{
            //if(data.length===0) this.dataService.getAllData();
            this.dataService.test();
            console.log(data);
        });
        //this.tableData = this.route.snapshot.data.profileperms;
        /*for(let i=0; i<this.tableData.length; i++) delete this.tableData[i].attributes;
        this.tableHeaders = Object.keys(this.tableData[0]);
        console.log(this.tableData);*/
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