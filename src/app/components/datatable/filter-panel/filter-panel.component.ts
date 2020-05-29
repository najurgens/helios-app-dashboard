import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-filter-panel",
  templateUrl: "./filter-panel.component.html",
  styleUrls: ["./filter-panel.component.scss"],
})
export class FilterPanelComponent implements OnInit {
  @Input() showFilterPanel: Boolean;
  @Output() showFilterPanelChange: EventEmitter<Boolean> = new EventEmitter();
  @Input() tableHeaders: Array<string>;
  filters: Map<any, any> = new Map();
  filterCount: number = 0;
  filterKeys: Array<number> = [];
  filterValues: Array<any> = [];

  //Combobox Variables
  //selectedField: string;
  //selectedOperator: string = "Equals";

  constructor() {}

  ngOnInit(): void {}

  addFilter() {
    // Add new filter to the map
    this.filters.set(this.filterCount, {
      key: this.filterCount,
      field: "New Filter" + this.filterCount,
      selectedField: this.tableHeaders[0],
      selectedOperator: "Equals",
      inputValue: "",
    });
    let idVal = this.filterCount;
    this.filterKeys.push(this.filterCount);
    this.filterValues = Array.from(this.filters.values());
    console.log(this.filterValues);
    this.showCriteria(null, idVal);
    //this.selectedField = this.tableHeaders[0];
    //initial selects
    this.selectedFieldItem(null, idVal);
    this.selectedOperatorItem(null, idVal);
    this.filterCount++;
    console.log(this.filterValues[0].inputValue);
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
    this.filters.clear();
    this.filterValues = [];
    this.filterKeys = [];
    this.filterCount = 0;
  }

  removeFilter(key) {
    this.filters.delete(key);
    this.filterKeys.splice(key, 1);
    this.filterValues = Array.from(this.filters.values());
  }

  selectedFieldItem(event, initialId) {
    if (!event) {
      const initialField = this.tableHeaders[0];
      const focusElement = "#focus" + initialField + initialId;
      setTimeout(() => {
        //add initial focus
        $(focusElement).addClass("slds-is-selected slds-has-focus");
        // add initial utility check
        $(focusElement)
          .find(".slds-icon-utility-check")
          .addClass("slds-visible")
          .removeClass("slds-hidden");
      }, 100);
    } else {
      const currentCriteriaElement =
        "#" + event.currentTarget.getAttribute("criteriaid");
      const currentFocusElement = "#focus" + event.currentTarget.id;
      const currentCriteriaIndex = currentCriteriaElement.slice(-1);
      this.filterValues[
        currentCriteriaIndex
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
    }
  }

  selectedOperatorItem(event, initialId) {
    if (!event) {
      const initialElement = "#focusEquals" + initialId;
      setTimeout(() => {
        //add initial focus
        $(initialElement).addClass("slds-is-selected slds-has-focus");
        // add initial utility check
        $(initialElement)
          .find(".slds-icon-utility-check")
          .addClass("slds-visible")
          .removeClass("slds-hidden");
      }, 100);
    } else {
      const currentCriteriaElement =
        "#" + event.currentTarget.getAttribute("criteriaid");
      const currentFocusElement = "#focus" + event.currentTarget.id;
      const currentCriteriaIndex = currentCriteriaElement.slice(-1);
      this.filterValues[
        currentCriteriaIndex
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
      }, 500);
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
