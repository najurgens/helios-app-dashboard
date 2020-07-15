import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-filter-panel",
  templateUrl: "./filter-panel.component.html",
  styleUrls: ["./filter-panel.component.scss"],
})
export class FilterPanelComponent implements OnInit {
  @Input() showFilterPanel: Boolean;
  @Output() showFilterPanelChange: EventEmitter<Boolean> = new EventEmitter();
  @Input() tableHeaders: Array<string>;
  @Input() filterListener: BehaviorSubject<Array<any>>;

  //current values
  filters: Map<any, any> = new Map();
  filterCount: number = 0;
  filterKeys: Array<number> = [];
  filterValues: Array<any> = [];
  deleteOffSet: number = 0;

  //updated values
  newFilters: Map<any, any> = new Map();
  newFilterCount: number = 0;
  newFilterKeys: Array<number> = [];
  newFilterValues: Array<any> = [];
  newDeleteOffSet: number = 0;

  filtersUpdated: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  addFilter() {
    // Add new filter to the map
    this.newFilters.set(this.newFilterCount, {
      key: this.newFilterCount,
      field: "New Filter" + this.newFilterCount,
      selectedField: this.tableHeaders[0],
      selectedOperator: "Equals",
      inputValue: "",
    });
    let idVal = this.newFilterCount;
    this.newFilterKeys.push(this.newFilterCount);
    this.newFilterValues = Array.from(this.newFilters.values());
    this.showCriteria(null, idVal);
    //initial selects
    this.itemSelected(null, idVal);
    this.newFilterCount++;
    this.filtersUpdated = true;
  }

  cancelChanges() {
    //set new Values back to the current values
    this.filtersUpdated = false;
    this.newFilters = new Map(this.filters);
    this.newFilterCount = this.filterCount;
    this.newFilterKeys = this.filterKeys;
    this.newFilterValues = this.filterValues;
    this.newDeleteOffSet = this.deleteOffSet;
  }

  itemSelected(event, initialId) {
    this.filtersUpdated = true;
    if (!event) {
      const initialOperatorElement = "#focusEquals" + initialId;
      const initialFieldElement = "#focus" + this.tableHeaders[0] + initialId;
      setTimeout(() => {
        //add initial focus
        $(initialFieldElement).addClass("slds-is-selected slds-has-focus");
        $(initialOperatorElement).addClass("slds-is-selected slds-has-focus");
        // add initial utility check
        $(initialFieldElement)
          .find(".slds-icon-utility-check")
          .addClass("slds-visible")
          .removeClass("slds-hidden");
        $(initialOperatorElement)
          .find(".slds-icon-utility-check")
          .addClass("slds-visible")
          .removeClass("slds-hidden");
      }, 100);
    } else if (event.currentTarget.type === "field") {
      const currentCriteriaElement =
        "#" + event.currentTarget.getAttribute("criteriaid");
      const currentFocusElement = "#focus" + event.currentTarget.id;
      const currentCriteriaIndex = currentCriteriaElement.slice(-1);
      const filter = this.newFilters.get(parseInt(currentCriteriaIndex));
      const filterValueIndex = this.newFilterValues.indexOf(filter);
      this.newFilterValues[
        filterValueIndex
      ].selectedField = event.currentTarget.getAttribute("val");
      //remove previous focus
      $(currentCriteriaElement)
        .find(".slds-has-focus")
        .removeClass("slds-is-selected slds-has-focus");
      // remove previous utility check
      $(currentCriteriaElement)
        .find(".slds-icon-utility-check.slds-visible")
        .removeClass("slds-visible")
        .addClass("slds-hidden");
      //add new focus
      $(currentFocusElement).addClass("slds-is-selected slds-has-focus");
      // add new utility check
      $(currentFocusElement)
        .find(".slds-icon-utility-check")
        .addClass("slds-visible")
        .removeClass("slds-hidden");
    } else if (event.currentTarget.type === "operator") {
      const currentCriteriaElement =
        "#" + event.currentTarget.getAttribute("criteriaid");
      const currentFocusElement = "#focus" + event.currentTarget.id;
      const currentCriteriaIndex = currentCriteriaElement.slice(-1);
      const filter = this.newFilters.get(parseInt(currentCriteriaIndex));
      const filterValueIndex = this.newFilterValues.indexOf(filter);
      this.newFilterValues[
        filterValueIndex
      ].selectedOperator = event.currentTarget.getAttribute("val");
      //remove previous focus
      $($(currentCriteriaElement).find(".slds-has-focus")[1]).removeClass(
        "slds-is-selected slds-has-focus"
      );
      // remove previous utility check
      $(
        $(currentCriteriaElement).find(
          ".slds-icon-utility-check.slds-visible"
        )[1]
      )
        .removeClass("slds-visible")
        .addClass("slds-hidden");
      //add new focus
      $(currentFocusElement).addClass("slds-is-selected slds-has-focus");
      // add new utility check
      $(currentFocusElement)
        .find(".slds-icon-utility-check")
        .addClass("slds-visible")
        .removeClass("slds-hidden");
    }
  }

  openComboBox(event) {
    let index = event.target.id.slice(-1);
    let dropDown;
    if (event.target.id === "combobox-fields" + index) {
      dropDown = $("#fieldCB" + index);
      dropDown.addClass("slds-is-open");
    } else {
      dropDown = $("#operatorCB" + index);
      dropDown.addClass("slds-is-open");
    }

    //Close container on mouseup outside of container
    $(<any>document).on("mouseup.hideCombobox", (e) => {
      var container = $("#" + event.target.id);

      // if the target of the click isn't the container nor a descendant of the container
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        dropDown.removeClass("slds-is-open");
        $(document).off(".hideCombobox");
      }
    });
  }

  removeAllFilters() {
    this.newFilters.clear();
    this.newFilterValues = [];
    this.newFilterKeys = [];
    this.newFilterCount = 0;
    this.newDeleteOffSet = 0;
    this.filtersUpdated = true;
  }

  removeFilter(key) {
    this.newFilters.delete(key);
    this.newFilterKeys.splice(key, 1);
    this.newFilterValues = Array.from(this.newFilters.values());
    this.newDeleteOffSet++;
    this.filtersUpdated = true;
  }

  saveChanges() {
    //Save new values to current values
    console.log(this.newFilters);
    this.filtersUpdated = false;
    this.filters = new Map(this.newFilters);
    this.filterCount = this.newFilterCount;
    this.filterKeys = this.newFilterKeys;
    this.filterValues = this.newFilterValues;
    this.deleteOffSet = this.newDeleteOffSet;
    this.filterListener.next(this.filterValues);
  }

  setFilterCriteriaPosition(index) {
    let filterPosition = $("#filter" + index).offset();
    let criteriaPosition = $("#filterCriteria" + index).offset();
    let topVal = filterPosition.top - 120;
    let leftVal = filterPosition.left - 340;
    $("#filterCriteria" + index).css("top", topVal + "px");
    $("#filterCriteria" + index).css("left", leftVal + "px");
  }

  showCriteria(existingFilter, index) {
    //if(event) index = $(event.target).closest('li').attr("data-index");
    if (!existingFilter) {
      setTimeout(() => {
        this.setFilterCriteriaPosition(index);
      }, 300);
    } else {
      index = $(existingFilter.target).closest("li").attr("id").slice(-1);
      this.setFilterCriteriaPosition(index);
      $("#filterCriteria" + index).addClass("slds-visible");
      $("#filterCriteria" + index).removeClass("slds-hidden");
    }
    //Close container on mouseup outside of container
    $(<any>document).on("mouseup.hideDocClick", (e) => {
      var container = $("#filterCriteria" + index);

      // if the target of the click isn't the container nor a descendant of the container
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.addClass("slds-hidden");
        $(document).off(".hideDocClick");
        $(window).off(".trackResize");
        $("#filterList").off(".trackScroll");
      }
    });

    //Listern to reposition criteria box with window resize
    $(window).on("resize.trackResize", () => {
      let filterPosition = $("#filter" + index).offset();
      let leftVal = filterPosition.left - 340;
      $("#filterCriteria" + index).css("left", leftVal + "px");
    });

    //Listener to reposition criteria box with scroll
    $("#filterList").on("scroll.trackScroll", () => {
      let filterPosition = $("#filter" + index).offset();
      let topVal = filterPosition.top - 120;
      $("#filterCriteria" + index).css("top", topVal + "px");
    });
  }

  toggleFilter() {
    this.showFilterPanelChange.emit(!this.showFilterPanel);
    this.showFilterPanel = !this.showFilterPanel;
    if (this.showFilterPanel) $("app-filter-panel").removeClass("slds-hide");
    else $("app-filter-panel").addClass("slds-hide");
  }
}
