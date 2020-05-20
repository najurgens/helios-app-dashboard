import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { debounceTime, map, distinctUntilChanged } from "rxjs/operators";
import { fromEvent } from "rxjs";
import { INglDatatableSort, INglDatatableRowClick } from "ng-lightning";
import { ExportToCsv } from "export-to-csv";

@Component({
  selector: "app-datatable",
  templateUrl: "./datatable.component.html",
  styleUrls: ["./datatable.component.scss"],
})
export class DatatableComponent implements OnInit {
  @Input() tableData: Array<any>;
  @Input() tableHeaders: Array<string>;
  @ViewChild("dataSearchInput", { static: true }) dataSearchInput: ElementRef;

  // Initial sort
  sort: INglDatatableSort = { key: "Name", order: "asc" };

  filteredData: Array<any>;
  showFilterPanel: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log(this.tableData);
    // Subscription for Filter
    this.filteredData = this.tableData;
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
        this.filterDatatable(text.toLowerCase());
      });
  }

  ngAfterViewInit() {
    //locking table headers
    $("th").css("position", "sticky");
    $("th").css("top", "0");
    $("th").css("z-index", "1000");
  }

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

  filterDatatable(event) {
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

  toggleFilter() {
    this.showFilterPanel = !this.showFilterPanel;
    if (this.showFilterPanel) $("app-filter-panel").removeClass("slds-hide");
    else $("app-filter-panel").addClass("slds-hide");
  }

  refreshTable() {}

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
