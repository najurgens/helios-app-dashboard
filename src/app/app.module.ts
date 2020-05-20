import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { DataTablesModule } from "angular-datatables";
import { FormsModule } from "@angular/forms";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatListModule } from "@angular/material/list";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { LoginComponent } from "./layouts/auth/login.component";
import { ProfilePermissionsComponent } from "./layouts/profile-permissions/pp-component";
import { PermissionSetPermissionsComponent } from "./layouts/permission-set-permissions/psp-component";
import { ProfileCrudPermissionsComponent } from "./layouts/profile-crud-permissions/pcp-component";
import { PermissionSetCrudPermissionsComponent } from "./layouts/permission-set-crud-permissions/pscp-component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { DashboardComponent } from "./layouts/dashboard/dashboard.component";
import { DataService } from "./services/data-service";
import { LoadingScreenComponent } from "./layouts/loading-screen/loading-screen.component";
import { LoadingScreenInterceptor } from "./helpers/loading.interceptor";
import { NglModule } from "ng-lightning";
import { DatatableComponent } from "./components/datatable/datatable.component";
import { FilterPanelComponent } from "./components/datatable/filter-panel/filter-panel.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfilePermissionsComponent,
    PermissionSetPermissionsComponent,
    ProfileCrudPermissionsComponent,
    PermissionSetCrudPermissionsComponent,
    LoadingScreenComponent,
    DashboardComponent,
    DatatableComponent,
    FilterPanelComponent,
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    NglModule,
    HttpClientModule,
    MatListModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
