import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './layouts/auth/login.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

//import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  // tslint:disable-next-line: max-line-length
  // { path: 'login', redirectTo: 'account/auth/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent/*, canActivate: [AuthGuard] */},
  { path: 'home', component: AppComponent/*, canActivate: [AuthGuard] */},
  { path: 'dashboard', component: DashboardComponent/*, canActivate: [AuthGuard] */}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }