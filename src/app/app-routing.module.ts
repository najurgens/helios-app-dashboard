import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './layouts/auth/login.component';
import { SharedComponent } from './layouts/shared/shared.component';
import { ProfilePermissionSetComponent } from './layouts/profiles-permission-sets/pp-component';

//import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // tslint:disable-next-line: max-line-length
  // { path: 'login', redirectTo: 'account/auth/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent/*, canActivate: [AuthGuard] */},
  { path: 'profiles-permissions', component: ProfilePermissionSetComponent/*, canActivate: [AuthGuard] */},
  { path: 'shared', component: SharedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }