import { Component, NgModule } from '@angular/core';
import { AuthService } from '../../services/auth-service';

import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms'
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'shared',
    templateUrl: 'shared.component.html',
    styleUrls: ['shared.component.scss']
})
export class SharedComponent {
    title = 'Helios';
    opened = false;

    //constructor(private authService:AuthService) {}
}