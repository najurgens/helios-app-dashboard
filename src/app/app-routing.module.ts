import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './layouts/auth/login.component';
import { ProfilePermissionsComponent } from './layouts/profile-permissions/pp-component';
import { PermissionSetPermissionsComponent } from './layouts/permission-set-permissions/psp-component';
import { ProfileCrudPermissionsComponent } from './layouts/profile-crud-permissions/pcp-component';
import { PermissionSetCrudPermissionsComponent } from './layouts/permission-set-crud-permissions/pscp-component';
import { AuthGuardService } from './services/auth-guard'; 
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { AuthService } from './services/auth-service';
import { ProfileComponent } from './layouts/profile/profile.component';
import { SystemSettingsComponent } from './layouts/settings/system-settings/system-settings.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent/*, canActivate: [AuthGuard] */}, 
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'system-settings', component:  SystemSettingsComponent, canActivate: [AuthGuardService] },
  { path: 'profiles-permissions', component: ProfilePermissionsComponent, canActivate: [AuthGuardService] },
  { path: 'permission-set-permissions', component: PermissionSetPermissionsComponent, canActivate: [AuthGuardService] },
  { path: 'profile-crud-permissions', component: ProfileCrudPermissionsComponent, canActivate: [AuthGuardService] },
  { path: 'permission-set-crud-permissions', component: PermissionSetCrudPermissionsComponent, canActivate: [AuthGuardService] },
  { path: '', component: DashboardComponent, canActivate: [AuthGuardService] }
  // UPDATE: { DASHBOARD COMPONENT '' HOME PATH } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { 

    constructor(private route:ActivatedRoute) {
        this.route.queryParams.subscribe(params => {
          console.log('WITHIN GLOBAL ROUTER, QUERY params= ' + JSON.stringify(params));
        });
    }
}