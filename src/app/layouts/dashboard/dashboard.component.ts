import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';  
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data-service';
import { isEmptyExpression } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  opened = false;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private dataService: DataService) 
    {

    console.log('Within profile-permissionSet constructor!');
    console.log('isAuthenticated: ' + this.authService.isAuthenticated());
    //console.log('AUTH-GUARD refreshToken: ' + AuthService.refreshToken + ', accessToken: ' + AuthService.accessToken + ', user: ' + AuthService.currentUser + ', instanceUrl: ' + AuthService.instanceUrl);
    this.route.queryParams.subscribe(params => {
        if (JSON.stringify(params)!=='{}') {
            const allParams = JSON.parse(params.auth);
            const authObj = { currentUser: allParams['user'], accessToken: allParams['accessToken'], refreshToken: allParams['refreshToken'], instanceUrl: allParams['instanceUrl'] };
            sessionStorage.setItem('auth', JSON.stringify(authObj));
        }
    });
}

  ngOnInit(): void {
  }

}
