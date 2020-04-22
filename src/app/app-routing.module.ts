import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './layouts/auth/login.component';
import { ProfilePermissionsComponent } from './layouts/profile-permissions/pp-component';
import { PermissionSetPermissionsComponent } from './layouts/permission-set-permissions/psp-component';
import { ProfileCrudPermissionsComponent } from './layouts/profile-crud-permissions/pcp-component';
import { PermissionSetCrudPermissionsComponent } from './layouts/permission-set-crud-permissions/pscp-component';
import { ProfilePermissionsResolve } from './layouts/profile-permissions/pp.resolve';
import { AuthGuardService } from './services/auth-guard'; 
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { AuthService } from './services/auth-service';

//import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // tslint:disable-next-line: max-line-lengt
  // { path: 'login', redirectTo: 'account/auth/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent/*, canActivate: [AuthGuard] */}, 
  { path: 'profiles-permissions', component: ProfilePermissionsComponent, resolve:{ profileperms:ProfilePermissionsResolve } , canActivate: [AuthGuardService] },
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