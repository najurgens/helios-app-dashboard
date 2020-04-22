import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';  
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data-service';
import { isEmptyExpression, ArrayType } from '@angular/compiler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  opened = false;
  profilesData:Array<any>;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private dataService: DataService) 
    {
}

  ngOnInit(): void {
    // ---Setting AccessToken, RefreshToken, and IsntanceUrl to seassion storage
    this.route.queryParams.subscribe(params => {
        if (JSON.stringify(params)!=='{}') {
            const allParams = JSON.parse(params.auth);
            const authObj = { currentUser: allParams['user'], accessToken: allParams['accessToken'], refreshToken: allParams['refreshToken'], instanceUrl: allParams['instanceUrl'] };
            sessionStorage.setItem('auth', JSON.stringify(authObj));
            this.dataService.getProfiles('profiles', authObj.accessToken, authObj.instanceUrl);
            this.dataService.profiles.subscribe(data=>console.log(data));
        }
    });
  }

}
