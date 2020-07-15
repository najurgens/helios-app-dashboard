import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Input,
} from "@angular/core";
import { fromEvent } from "rxjs";
import {
  debounceTime,
  map,
  distinctUntilChanged,
  filter,
} from "rxjs/operators";
import { ExportToCsv } from "export-to-csv";

@Component({
  selector: "app-page-header",
  templateUrl: "./page-header.component.html",
  styleUrls: ["./page-header.component.scss"],
})
export class PageHeaderComponent implements OnInit {
  @Input() tableData: Array<any>;
  @Input() highlightCells: Boolean;
  @Output() highlightCellsChange: EventEmitter<Boolean> = new EventEmitter();
  @Input() highlightRows: Boolean;
  @Output() highlightRowsChange: EventEmitter<Boolean> = new EventEmitter();
  @Output() toggleFilter = new EventEmitter<string>();
  @Output() searchFilterDatatable = new EventEmitter<string>();
  @Output() refreshTable = new EventEmitter<string>();
  @ViewChild("dataSearchInput", { static: true }) dataSearchInput: ElementRef;

  constructor() {}

  ngOnInit(): void {
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
        this.searchFilterDatatable.next(text.toLowerCase());
      });
  }

  callToggleFilter(): void {
    this.toggleFilter.next();
  }

  createCSV() {
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

  callRefreshTable() {
    this.refreshTable.next();
  }

  handleHighlightToggle(event) {
    if (event.currentTarget.name === "checkbox-toggle-cell-highlighting") {
      if (event.currentTarget.checked) {
        this.highlightCellsChange.emit(true);
      } else this.highlightCellsChange.emit(false);
    } else {
      if (event.currentTarget.checked) {
        this.highlightRowsChange.emit(true);
      } else this.highlightRowsChange.emit(false);
    }
  }

  tableSettings() {
    $("#tableSettings").hasClass("slds-is-open")
      ? $("#tableSettings").removeClass("slds-is-open")
      : $("#tableSettings").addClass("slds-is-open");
  }
}
