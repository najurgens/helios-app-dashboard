import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth-service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  setupOpen: Boolean = false;
  userSetupOpen: Boolean = false;
  showMenus: Boolean;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.isAuth.subscribe((auth) => {
      this.authService.showMenu.subscribe((state) => {
        this.showMenus = (authService.isAuthenticated() || auth) && state;
      });
    });
  }

  ngOnInit(): void {}

  receiveMenuState($event) {
    this.showMenus = $event;
  }

  navigateToSettings() {
    this.router.navigate(["/system-settings"]);
  }

  navigateToObjectSettings() {
    this.router.navigate(["/object-settings"]);
  }

  navigateToProfile() {
    this.router.navigate(["/profile"]);
  }

  toggleSetup() {
    document.getElementById("setupToggle").classList.toggle("slds-is-open");
    this.setupOpen = !this.setupOpen;
    if (this.userSetupOpen === true) {
      document
        .getElementById("userSetupToggle")
        .classList.toggle("slds-is-open");
      this.userSetupOpen = !this.userSetupOpen;
    }
  }

  toggleUserSetup() {
    document.getElementById("userSetupToggle").classList.toggle("slds-is-open");
    this.userSetupOpen = !this.userSetupOpen;
    if (this.setupOpen === true) {
      document.getElementById("setupToggle").classList.toggle("slds-is-open");
      this.setupOpen = !this.setupOpen;
    }
  }
}
