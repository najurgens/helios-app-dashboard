import { Component } from "@angular/core";

//Jquery
declare let $: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor() {}

  ngOnInit() {
    console.log("on init APP COMPONENT!");
  }
}
