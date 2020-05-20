import { Injectable, EventEmitter, Output, Input } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { HttpUrlEncodingCodec, HttpParameterCodec } from '@angular/common/http'
import { AppComponent } from '../app.component'; 
import { defaultPermissions, defaultObjectPermissions } from '../static/default-key-permissions';

import { AuthService } from './auth-service';
import { decode } from 'punycode';
import { Subject } from 'rxjs';
import { AccountService } from './account-service';

@Injectable({ providedIn: 'root' })
export class AuthGuardService implements CanActivate {

    showMenusChange: Subject<Boolean> = new Subject<Boolean>();
    constructor(private router: Router, private authService: AuthService, private accountService: AccountService, private activatedRoute: ActivatedRoute) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('isAuth in AuthGuard: ' + this.authService.isAuthenticated());
        if (this.authService.isAuthenticated()) {
            console.log('FROM AUTH GUARD, ALREADY AUTHENTICATED!!!');
            console.log('in AuthGuard, auth = ' + sessionStorage.getItem('auth'));
            return true;                                                                                                    
        } else {
            if (state.url.includes('accessToken')) {
                console.log('data from back-end: ' + decodeURIComponent(state.url));    
                this.authService.isAuth.next(true);
                const auth = decodeURIComponent(state.url).split("=")[1];
                sessionStorage.setItem('auth', JSON.stringify(auth));
                console.log('WITHIN AUTH GUARD, SESSION STORAGE = ' + sessionStorage.getItem('auth'));
                this.getAccountSettings();
                //this.showMenusChange.next(true);
                this.router.navigate(['']);
                return true;
            } else {
                this.router.navigate(['/login'], {
                    queryParams: { return: state.url }
                });
                return false;
            }
        }
    }

    getAccountSettings() {
        console.log('defaultPermissions: ' + JSON.stringify(defaultPermissions) + ', defaultObjPermissions: ' + JSON.stringify(defaultObjectPermissions));
        console.log('defaultPermissions[key]: ' + defaultPermissions['PermissionsAuthorApex']);

        console.log('within authGuard, getAccountSettings()');
        const authGov = JSON.parse(JSON.parse(sessionStorage.getItem('auth')));
        console.log('within getAccountSettings(), authGov = ' + JSON.stringify(authGov));
        //this.accountService.getAccount('account', authGov.authGovAccessToken, authGov.authGovInstanceUrl, '1');
        //this.accountService.account.subscribe((account)=>console.log('VALID ACCOUNT: ' + JSON.stringify(account)));
        this.accountService.getAccount('account', authGov.authGovAccessToken, authGov.authGovInstanceUrl, authGov.user.organizationId).subscribe((account)=>{
            if (account) {
                if (JSON.stringify(account)==='[]') {
                    console.log('access token to use: ' + authGov.accessToken + ', url to use: ' + authGov.instanceUrl);
                    this.accountService.getOrgInfo('orgInfo', authGov.accessToken, authGov.instanceUrl)
                        .subscribe((orgInfo)=>{
                            console.log('orgInfo received: ' + JSON.stringify(orgInfo));
                            console.log('orgInfo[0][Name]: ' + JSON.stringify(orgInfo[0]['Name']));
                            //console.log('defaultPermissions: ' + JSON.stringify(defaultPermissions) + ', defaultObjPermissions: ' + JSON.stringify(defaultObjectPermissions));
                            const newAccount = {
                                name: orgInfo[0]['Name'],
                                //address: orgInfo[0]['Address'],
                                city: orgInfo[0]['Address']['city'],
                                country: orgInfo[0]['Address']['country'],
                                postalCode: orgInfo[0]['Address']['postalCode'],
                                state: orgInfo[0]['Address']['state'],
                                street: orgInfo[0]['Address']['street'],
                                //organizationType: orgInfo[0]['OrganizationType'],
                                phone: orgInfo[0]['Phone'],
                                primaryContact: orgInfo[0]['PrimaryContact'],
                                keyPermissions: JSON.stringify(defaultPermissions),
                                keyObjects: JSON.stringify(defaultObjectPermissions),
                                organizationId: authGov.user.organizationId
                            }

                            console.log('newAccount: ' + JSON.stringify(newAccount));

                            this.accountService.createAccount('account', authGov.authGovAccessToken, authGov.authGovInstanceUrl, newAccount).subscribe((res)=>{
                                console.log('result of account creation: ' + JSON.stringify(res));
                                this.accountService.accountSource.next(res);
                                this.accountService.keyPermissionsSource.next(defaultPermissions);
                                this.accountService.keyObjectsSource.next(defaultObjectPermissions);
                            });
                    });
                } else {
                    this.accountService.accountSource.next(account);
                    this.accountService.accountSource.subscribe((acct)=>{
                        console.log('acct already created: ' + JSON.stringify(acct));
                        this.accountService.keyPermissionsSource.next(JSON.parse(acct[0].Key_Permissions__c));
                        this.accountService.keyObjectsSource.next(JSON.parse(acct[0].Key_Objects__c));
                    });
                }
            }
        });
    }
    
}