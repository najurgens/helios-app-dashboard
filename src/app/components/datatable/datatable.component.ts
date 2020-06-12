import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { INglDatatableSort, INglDatatableRowClick } from "ng-lightning";
import { DataService } from "../../services/data-service";
import { FilterPanelComponent } from "./filter-panel/filter-panel.component";
import { LoadingScreenService } from "../../services/loading-screen.service";
import { AccountService } from "../../services/account-service";

@Component({
  selector: "app-datatable",
  templateUrl: "./datatable.component.html",
  styleUrls: ["./datatable.component.scss"],
})
export class DatatableComponent implements OnInit {
  @Input() tableData: Array<any>;
  @Input() tableHeaders: Array<string>;
  @Input() tableName: string;
  @ViewChild("dataSearchInput", { static: true }) dataSearchInput: ElementRef;
  @ViewChild(FilterPanelComponent) filterPanelComponent: FilterPanelComponent;

  // Initial sort
  sort: INglDatatableSort = { key: "Name", order: "asc" };

  originalTableData: Array<any>;
  filteredData: Array<any>;
  showFilterPanel: boolean = false;
  filterListener = new BehaviorSubject([]);
  initialSubscribe: boolean = true;
  itemsToHighlight: Object;
  highlightRows: boolean = false;
  highlightCells: boolean = false;

  constructor(
    private dataService: DataService,
    private loadingScreenService: LoadingScreenService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    console.log(this.tableData);
    this.originalTableData = this.tableData;
    console.log(this.originalTableData);
    this.filteredData = this.tableData;

    this.tableName === "permission-sets" || this.tableName === "profiles"
      ? this.accountService.keyPermissions.subscribe(
          (permissions) => (this.itemsToHighlight = permissions)
        )
      : this.accountService.keyObjectsSource
          .asObservable()
          .subscribe((objects) => (this.itemsToHighlight = objects));
    // Subscription for Filter Panel
    //this.filterListener.next([]);
    this.filterListener.asObservable().subscribe((filterValues) => {
      //clear previous highlighting for table filter
      $('td[style*="background-color: yellow"]').css("background-color", "");
      if (!this.initialSubscribe) this.filterDataTable(filterValues);
      if (this.initialSubscribe) this.initialSubscribe = false;
    });
  }

  ngAfterViewInit() {
    //locking table headers
    $("th").css("position", "sticky");
    $("th").css("top", "0");
    $("th").css("z-index", "1000");
  }

  ngAfterViewChecked() {
    if (this.highlightCells === false) {
      $('td[style*="background-color: lightblue"]').css("background-color", "");
      $('td[style*="background-color: cadetblue"]').css("background-color", "");
    }
    if (this.highlightRows === false) {
      $('tr[style*="background-color: lightblue"]').css("background-color", "");
    }
    if (this.highlightCells === true || this.highlightRows === true)
      this.highlight();
  }

  checkKeyObjects(keyObjects) {}

  onSort($event: INglDatatableSort) {
    const { key, order } = $event;
    this.tableData.sort((a: any, b: any) => {
      return (
        (key === "rank"
          ? b[key].toString() - a[key]
          : b[key].toString().localeCompare(a[key])) *
        (order === "desc" ? 1 : -1)
      );
    });
  }

  onRowClick($event: INglDatatableRowClick) {
    console.log("clicked row", $event.data);
  }

  searchFilterDatatable(event) {
    console.log("in search");
    console.log(event);
    if (event.length > 2) {
      let val = event;
      let colsAmt = this.tableHeaders.length;
      // get the key names of each column in the dataset
      let keys = [...this.tableHeaders];
      // assign filtered matches to the active datatable
      this.tableData = this.filteredData.filter(function (item) {
        // iterate through each row's column data
        for (let i = 0; i < colsAmt; i++) {
          // check for a match
          if (
            item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 ||
            !val
          ) {
            // found match, return true to add to result set
            return true;
          }
        }
      });
    } else this.tableData = this.filteredData;
  }

  filterDataTable(filterValues) {
    this.loadingScreenService.startLoading();
    if (filterValues.length === 0) this.tableData = this.originalTableData;
    else {
      console.log("inside filterdatable");
      console.log(this.tableData);
      const arrayToObject = (array) =>
        array.reduce((obj, item, index) => {
          obj[index] = item;
          return obj;
        }, {});
      const tableDataObject = arrayToObject(this.originalTableData);
      console.log(tableDataObject);
      //console.log(this.tableHeaders);
      console.log(filterValues);

      for (let filter of filterValues) {
        if (filter.selectedOperator === "Equals") {
          this.originalTableData.forEach((row, index) => {
            if (row[filter.selectedField].toString() !== filter.inputValue) {
              delete tableDataObject[index];
            }
          });
        } else if (filter.selectedOperator === "Does Not Equal") {
          this.originalTableData.forEach((row, index) => {
            if (row[filter.selectedField] === filter.inputValue) {
              delete tableDataObject[index];
            }
          });
        } else if (filter.selectedOperator === "Contains") {
          this.originalTableData.forEach((row, index) => {
            if (
              !row[filter.selectedField].toString().includes(filter.inputValue)
            ) {
              delete tableDataObject[index];
            }
          });
        }
      }
      console.log(tableDataObject);
      this.tableData = Object.values(tableDataObject);
    }
    this.loadingScreenService.stopLoading();
  }

  highlight() {
    //Highligting for Key Permissions
    console.log(this.tableData);
    if (this.tableName === "permission-sets" || this.tableName === "profiles") {
      for (let item in this.itemsToHighlight) {
        if (this.itemsToHighlight.hasOwnProperty(item)) {
          if (this.itemsToHighlight[item] === true) {
            if (this.highlightCells === true && this.highlightRows === true) {
              $("td[data-label=" + item + "]")
                .find("div:contains(true)")
                .parent()
                .css("background-color", "cadetblue");
              $("td[data-label=" + item + "]")
                .find("div:contains(true)")
                .parent()
                .parent()
                .css("background-color", "lightblue");
            } else if (this.highlightCells === true) {
              $("td[data-label=" + item + "]")
                .find("div:contains(true)")
                .parent()
                .css("background-color", "lightblue");
            } else {
              $("td[data-label=" + item + "]")
                .find("div:contains(true)")
                .parent()
                .parent()
                .css("background-color", "lightblue");
            }
          }
        }
      }
    } else {
      //Highlighting for Key Objects
      const itemsToHighlight = this.itemsToHighlight;
      for (let item in itemsToHighlight) {
        console.log(item);
        if (itemsToHighlight.hasOwnProperty(item)) {
          if (this.highlightCells === true && this.highlightRows === true) {
            $("td[data-label=" + item + "]")
              .filter(function () {
                return $(this).text() === itemsToHighlight[item].join("");
              })
              .css("background-color", "cadetblue");
            $("td[data-label=" + item + "]")
              .filter(function () {
                return $(this).text() === itemsToHighlight[item].join("");
              })
              .parent()
              .css("background-color", "lightblue");
          } else if (this.highlightCells === true) {
            $("td[data-label=" + item + "]")
              .filter(function () {
                return $(this).text() === itemsToHighlight[item].join("");
              })
              .css("background-color", "lightblue");
          } else {
            $("td[data-label=" + item + "]")
              .filter(function () {
                return $(this).text() === itemsToHighlight[item].join("");
              })
              .parent()
              .css("background-color", "lightblue");
          }
        }
      }
    }
    //}
  }

  toggleFilter() {
    this.showFilterPanel = !this.showFilterPanel;
    if (this.showFilterPanel) $("app-filter-panel").removeClass("slds-hide");
    else $("app-filter-panel").addClass("slds-hide");
  }

  refreshTable() {
    if (this.tableName === "profiles")
      this.dataService.getProfiles(this.tableName);
    else if (this.tableName === "permission-sets")
      this.dataService.getPermissions(this.tableName);
    else if (this.tableName === "profile-crud-permissions")
      this.dataService.getProfileCrud(this.tableName);
    else this.dataService.getPermissionSetCrud(this.tableName);
  }
}
