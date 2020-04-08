import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './layouts/auth/login.component';
import { ProfilePermissionSetComponent } from './layouts/profiles-permission-sets/pp-component';
//import { AuthGuardService } from './services/auth-guard'; 
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

//import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // tslint:disable-next-line: max-line-lengt
  // { path: 'login', redirectTo: 'account/auth/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent/*, canActivate: [AuthGuard] */},
  { path: 'profiles-permissions', component: ProfilePermissionSetComponent/*, canActivate: [AuthGuardService] */},
  { path: '', component: ProfilePermissionSetComponent }
  // UPDATE: { DASHBOARD COMPONENT '' HOME PATH }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }