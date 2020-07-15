import { Component, OnInit } from "@angular/core";
import { DataService } from "../../services/data-service";
import { ToastComponent } from "../../components/toast/toast.component";

@Component({
  selector: "profiles-permissions",
  templateUrl: "./pp-component.html",
  styleUrls: ["./pp-component.scss"],
})
export class ProfilePermissionsComponent implements OnInit {
  tableHeaders: Array<string>;
  profiles: Array<any>;
  tableData: Array<any>;
  accessToken: string;
  instanceUrl: string;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.profiles.subscribe((data) => {
      if (this.tableData) this.tableData = [];
      if (data.tableData.length === 0) this.dataService.getAllData();
      else {
        this.tableData = data.tableData;
        this.tableHeaders = data.tableHeaders;
      }
    });
    $(".slds-is-active").removeClass("slds-is-active");
    $("#ProfilePermTab").addClass("slds-is-active");
  }
}
