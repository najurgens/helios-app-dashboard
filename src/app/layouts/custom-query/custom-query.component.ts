import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';  
import { ActivatedRoute, Router } from '@angular/router';

import { DataService } from '../../services/data-service';
import { isEmptyExpression } from '@angular/compiler';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'custom-query',
  templateUrl: './custom-query.component.html',
  styleUrls: ['./custom-query.component.scss']
})
export class CustomQueryComponent {

    query:String;
    records:Object[];

    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private dataService: DataService) {


        
    }

}