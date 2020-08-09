import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { AuthenticationService } from '@services/authentication.service'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) { }

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.authService.isAuthenticated().pipe(map(
      isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['/login'])
        }
        return isAuthenticated
      }
    ))
  }

}
