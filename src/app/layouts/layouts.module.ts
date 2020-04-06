import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';

import { ProfilePermissionSetComponent } from '../layouts/profiles-permission-sets/pp-component';


@NgModule({
  declarations: [ProfilePermissionSetComponent],
  imports: [
      DataTablesModule
  ]
})
export class LayoutModule { }