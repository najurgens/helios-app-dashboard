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

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private dataService: DataService) {
    this.dataService.getAllData();
  }

  ngOnInit(): void {
    this.dataService.getAllData();
    $("#homeTab").addClass("slds-is-active");
    $('.slds-is-active').removeClass("slds-is-active");
    console.log('in dashboard');
  }

}
