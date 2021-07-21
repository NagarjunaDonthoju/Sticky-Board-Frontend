import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators'
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate, CanLoad {

  constructor (private authService : AuthService, private router : Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.helper();
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return this.helper()
;  }

  helper() : Observable<boolean>{
    return this.authService.isLoggedIn().pipe(map((user)=>{
      this.authService.updateUserUID(user);
      if (user) {
        this.router.navigate(['/profile']);
        return false;
    } else {
        return true;
    }
    })).pipe(take(1))
  }
}
