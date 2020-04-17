import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { ProfilePermissionsComponent } from './profile-permissions/pp-component';
import { PermissionSetPermissionsComponent } from './permission-set-permissions/psp-component';

@NgModule({
  declarations: [
    ProfilePermissionsComponent,
    PermissionSetPermissionsComponent,
  ],
  imports: [
      DataTablesModule,
      CommonModule,
  ]
})
export class LayoutModule { }