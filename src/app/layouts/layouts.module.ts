import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { ProfilePermissionsComponent } from './profile-permissions/pp-component';
import { PermissionSetPermissionsComponent } from './permission-set-permissions/psp-component';
import { ProfileCrudPermissionsComponent } from './profile-crud-permissions/pcp-component';
import { PermissionSetCrudPermissionsComponent } from './permission-set-crud-permissions/pscp-component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    ProfilePermissionsComponent,
    PermissionSetPermissionsComponent,
    ProfileCrudPermissionsComponent,
    PermissionSetCrudPermissionsComponent,
    DashboardComponent,
  ],
  imports: [
      DataTablesModule,
      CommonModule,
  ]
})
export class LayoutModule { }