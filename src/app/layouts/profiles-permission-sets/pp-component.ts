import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';  

@Component({
  selector: 'profiles-permissions',
  templateUrl: './pp-component.html',
  styleUrls: ['./pp-component.scss']
})
export class ProfilePermissionSetComponent {
  
    profiles:Array<any>
    permission_sets:Array<any>

    constructor() {
    }

}