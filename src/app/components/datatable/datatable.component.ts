import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
} from "rxjs/operators";
import { fromEvent, Observable, BehaviorSubject } from "rxjs";
import { INglDatatableSort, INglDatatableRowClick } from "ng-lightning";
import { DataService } from "../../services/data-service";
import { ExportToCsv } from "export-to-csv";
import { FilterPanelComponent } from "./filter-panel/filter-panel.component";
import { LoadingScreenService } from "../../services/loading-screen.service";
import { style } from "@angular/animations";

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

  constructor(
    private dataService: DataService,
    private loadingScreenService: LoadingScreenService
  ) {}

  ngOnInit(): void {
    console.log(this.tableData);
    this.originalTableData = this.tableData;
    console.log(this.originalTableData);
    this.filteredData = this.tableData;
    // Subscription for Filter Panel
    //this.filterListener.next([]);
    this.filterListener.asObservable().subscribe((filterValues) => {
      if (!this.initialSubscribe) this.filterDataTable(filterValues);
      if (this.initialSubscribe) this.initialSubscribe = false;
    });

    // Subscription for Search Filter
    fromEvent(this.dataSearchInput.nativeElement, "keyup")
      .pipe(
        // get value
        map((event: any) => {
          return event.target.value;
        }),
        // Time in milliseconds between key events
        debounceTime(500),
        // If previous query is diffent from current
        distinctUntilChanged()
        // subscription for response
      )
      .subscribe((text: string) => {
        this.searchFilterDatatable(text.toLowerCase());
      });
  }

  ngAfterViewInit() {
    //locking table headers
    $("th").css("position", "sticky");
    $("th").css("top", "0");
    $("th").css("z-index", "1000");
    //$(".test").css("background-color", "yellow");
    //console.log($(".test"));
  }

  ngAfterViewChecked() {
    //for(let keyLabel of keyLabels){
    $("td[data-label='PermissionsApexRestServices']")
      .find("div:contains(true)")
      .parent()
      .css("background-color", "yellow");
    //}
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
            if (row[filter.selectedField] !== filter.inputValue) {
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
            if (!row[filter.selectedField].includes(filter.inputValue)) {
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

  createCSV(data) {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: "Profiles and Permissions",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(options);
    csvExporter.generateCsv(this.tableData);
  }
}
