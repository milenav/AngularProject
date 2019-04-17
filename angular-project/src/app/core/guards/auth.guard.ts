import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.authService.isAuthenticated()) {
            return true;
        }
        this.router.navigate(['/home'])
        return false;
    }

}