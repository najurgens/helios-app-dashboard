import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './layouts/auth/login.component';
import { ProfilePermissionsComponent } from './layouts/profile-permissions/pp-component';
import { PermissionSetPermissionsComponent } from './layouts/permission-set-permissions/psp-component';
import { AuthGuardService } from './services/auth-guard'; 
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { AuthService } from './services/auth-service';
import { ProfileComponent } from './layouts/profile/profile.component';
import { SettingsComponent } from './layouts/settings/settings.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent/*, canActivate: [AuthGuard] */}, 
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'settings', component:  SettingsComponent, canActivate: [AuthGuardService] },
  { path: 'profiles-permissions', component: ProfilePermissionsComponent, canActivate: [AuthGuardService] },
  { path: 'permission-set-permissions', component: PermissionSetPermissionsComponent, canActivate: [AuthGuardService] },
  { path: '', component: ProfilePermissionsComponent, canActivate: [AuthGuardService] }
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