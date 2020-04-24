import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingScreenService } from '../../services/loading-screen.service';
import { Subscription } from "rxjs";

@Component({
    selector: 'app-loading-screen',
    templateUrl: './loading-screen.component.html',
    styleUrls: ['./loading-screen.component.scss']
})

export class LoadingScreenComponent implements OnInit, OnDestroy {
    loading: boolean = false;
    loadingSubscription: Subscription;

    constructor(private loadingScreenService: LoadingScreenService) {
    }

    ngOnInit() {
        console.log('loading screen component firing');
        this.loadingSubscription = this.loadingScreenService.loadingStatus.subscribe((value) => {
        this.loading = value;
        });
    }

    ngOnDestroy() {
        this.loadingSubscription.unsubscribe();
    }
}