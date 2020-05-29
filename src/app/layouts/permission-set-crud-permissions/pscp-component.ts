import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data-service";

@Component({
  selector: "permission-set-crud-permissions",
  templateUrl: "./pscp-component.html",
  styleUrls: ["./pscp-component.scss"],
})
export class PermissionSetCrudPermissionsComponent implements OnInit {
  tableHeaders: Array<string> = [];
  tableData: Array<any> = [];
  crudObj: Object = { "Permission Set Name": "" };
  accessToken: string;
  instanceUrl: string;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.permissionSetCrud.subscribe((data) => {
      if (data.length === 0) this.dataService.getAllData();
      else {
        this.getTableHeaders(data);
        this.getTableData(data);
      }
    });
    $(".slds-is-active").removeClass("slds-is-active");
    $("#PermSetCrudTab").addClass("slds-is-active");
  }

  getTableHeaders(permissions) {
    this.tableHeaders.push("Permission Set Name");
    for (let i = 0; i < permissions.length; i++) {
      if (!this.tableHeaders.includes(permissions[i].SobjectType)) {
        this.tableHeaders.push(permissions[i].SobjectType);
        this.crudObj[permissions[i].SobjectType] = "";
      }
    }
  }

  getTableData(permissions) {
    let currentObj = { ...this.crudObj };
    for (let j = 0; j < permissions.length; j++) {
      let crud = "";
      if (permissions[j].PermissionsCreate) crud += "C";
      if (permissions[j].PermissionsRead) crud += "R";
      if (permissions[j].PermissionsEdit) crud += "E";
      if (permissions[j].PermissionsDelete) crud += "D";
      if (permissions[j].PermissionsViewAllRecords) crud += "V";
      if (permissions[j].PermissionsModifyAllRecords) crud += "M";
      if (j === 0) {
        currentObj["Permission Set Name"] = permissions[j].Parent.Label;
        currentObj[permissions[j].SobjectType] = crud;
      } else if (
        permissions[j].Parent.Label === permissions[j - 1].Parent.Label
      ) {
        currentObj[permissions[j].SobjectType] = crud;
      } else {
        this.tableData.push(currentObj);
        currentObj = { ...this.crudObj };
        currentObj["Permission Set Name"] = permissions[j].Parent.Label;
        currentObj[permissions[j].SobjectType] = crud;
      }
    }
    this.tableData.push(currentObj);
  }
}
