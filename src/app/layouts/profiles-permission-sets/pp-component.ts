import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class ProfilePermissionSetComponent {
  
    profiles:Array<any>
    permission_sets:Array<any>

    constructor() {
    }

}