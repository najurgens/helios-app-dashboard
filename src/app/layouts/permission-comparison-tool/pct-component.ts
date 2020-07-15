import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DataService } from "../../services/data-service";
import { AuthService } from "src/app/services/auth-service";
import { Router, ActivatedRoute } from "@angular/router";
import { AccountService } from "src/app/services/account-service";

@Component({
  selector: "permission-comparison-tool",
  templateUrl: "./pct-component.html",
  styleUrls: ["./pct-component.scss"],
})
export class PermissionComparisonToolComponent implements OnInit {
  profilesMap: {} = {};
  permissionSetsMap: {} = {};
  permissionsMap: {} = {};

  profileKeys: {};
  permissionSetKeys: {};

  tableData: any;
  tableHeaders: any;

  //permissionsList: Array<string>;
  similarProfilesList: Array<string>;
  mergeList: Array<string>;

  Object = Object;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private accountService: AccountService
  ) {
    // get all profiles currently in the org, into picklist
    this.dataService.profiles.subscribe((profiles) => {
      if (JSON.stringify(profiles.tableData) === "[]") {
        //console.log(JSON.stringify(profiles));
        this.dataService.getProfiles("profiles");
      } else {
        this.profileKeys = profiles.tableHeaders;
        this.mapObjectsToList(this.profilesMap, profiles.tableData, 0);
        
        this.permissionsMap = { ...this.permissionsMap, ...this.profilesMap };
        
      }
    });

    // get all permission sets currently in the org, into picklist
    this.dataService.permissionSets.subscribe((permissionSets) => {
      if (JSON.stringify(permissionSets.tableData) === "[]")
        this.dataService.getPermissions("permission-sets");
      else {
        this.permissionSetKeys = permissionSets.tableHeaders;
        this.mapObjectsToList(
          this.permissionSetsMap,
          permissionSets.tableData,
          1
        );
        this.permissionsMap = {
          ...this.permissionsMap,
          ...this.permissionSetsMap,
        };
      }
    });
  }

  mapObjectsToList(map: Object, items: Array<JSON>, id: number) {
    switch (id) {
      case 0:
        items.forEach((profile) => {
          map[profile["Id"]] = profile;
        });
        break;
      case 1:
        items.forEach(
          (permissionSet) => (map[permissionSet["Id"]] = permissionSet)
        );
        break;
    }
  }

  ngOnInit() {
    this.dataService.permissionSets.subscribe((data) => {
      this.tableData = data.tableData;
      this.tableHeaders = data.tableHeaders;
    });
  }

  getAllObjects(obj) {}

  togglePicklist(event) {
    const state = $("#permissionsPicklist").attr("aria-expanded");
    state == "true" ? this.compressPicklist() : this.expandPicklist();
  }

  expandPicklist() {
    $("#permissionsPicklist").attr("aria-expanded", "true");
    $("#permissionsPicklist").addClass("slds-is-open");
  }

  compressPicklist() {
    $("#permissionsPicklist").attr("aria-expanded", "false");
    $("#permissionsPicklist").removeClass("slds-is-open");
  }

  selectPicklistOption(event) {
    //alert($(event.target).closest("div").attr("value"));
    //$("#permissionsPicklist").find("*").removeClass("slds-is-selected");
    const option = $(event.target).closest("div").attr("obj");
    //$(event.target).closest("div").addClass("slds-is-selected");
    $("#combobox-id-4").attr(
      "value",
      this.permissionsMap[option].Name != undefined
        ? this.permissionsMap[option].Name
        : this.permissionsMap[option].Label
    );

    // populate tableData to display record HERE
    // populate the similar permissions list HERE
  }

  // delete duplicate keys from 2nd object
  intersectJSON(a: Object, b: Object) {
    Object.keys(a).forEach((key) => {
      if (typeof b[key] !== undefined) delete b[key];
    });
    return b;
  }

  // displays permissions of a key object in second list
  showPermissions(event) {
    /*const key = $(event.target).closest("div").attr("value");
    //alert(key);
    let permissionsList = this.assignedObjects[key];
    //alert(permissionsList);*/
  }

  // toggle list item as selected or un-selected.
  toggleSelected(event) {
    const state =
      $(event.target).closest("div").attr("aria-selected") === "true"
        ? "false"
        : "true";
    $(event.target).closest("div").attr("aria-selected", state);
  }

  // switches between profiles only, permission sets only, or both
  filterPermissions(eventId) {
    switch (eventId) {
      case "profileRadio":
        $("#permissionsOptions")
          .children()
          .each(function () {
            $(this).children().first().attr("value") === "Profile"
              ? $(this).children().first().show()
              : $(this).children().first().hide();
          });
        break;
      case "permissionSetRadio":
        $("#permissionsOptions")
          .children()
          .each(function () {
            $(this).children().first().attr("value") === "PermissionSet"
              ? $(this).children().first().show()
              : $(this).children().first().hide();
          });
        break;
    }
  }
}
