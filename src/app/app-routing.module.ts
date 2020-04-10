import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './layouts/auth/login.component';
import { ProfilePermissionSetComponent } from './layouts/profiles-permission-sets/pp-component';
import { AuthGuardService } from './services/auth-guard'; 
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { AuthService } from './services/auth-service';
import { ProfileComponent } from './layouts/profile/profile.component';
import { SettingsComponent } from './layouts/settings/settings.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent/*, canActivate: [AuthGuard] */}, 
  { path: 'profiles-permissions', component: ProfilePermissionSetComponent, canActivate: [AuthGuardService] },
  { path: '', component: ProfilePermissionSetComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'settings', component:  SettingsComponent, canActivate: [AuthGuardService] }
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