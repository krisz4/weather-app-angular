import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppServiceService } from 'src/app/app-service.service';
import User from 'src/app/models/User';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private userService: AppServiceService, private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let user: { name: string, password: string, token: { expiration: string } } = JSON.parse(localStorage.getItem('WAPPCurrentUser'));
        let token: { expiration: string };
        if (user) {
            token = user.token;
        } else {
            return false;
        }
        let validToken = token && (new Date(token.expiration) > new Date());
        if (!validToken) {
            localStorage.removeItem('WAPPCurrentUser');
            this.router.navigate(['/', 'auth']);
            return false;
        }
        return true;
    }

}
