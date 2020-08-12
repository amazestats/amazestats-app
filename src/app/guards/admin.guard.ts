import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  CanActivateChild,
  Router,
} from '@angular/router'
import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { UserService } from '@services/user.service'
import { map, flatMap, switchMap, tap } from 'rxjs/operators'
import { AuthenticationService } from '@services/authentication.service'

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate, CanActivateChild {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userService: UserService,
  ) { }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.isAdmin().pipe(
      flatMap(isAdmin => {
        if (isAdmin) { return of(true) }

        return this.authService.isAuthenticated().pipe(
          tap(isAuthenticated => {
            if (isAuthenticated) {
              /**
               * If we are authenticated, the user cannot be helped.
               * The routes the user is trying to access is not available to
               * them, thus we show them a not found resource.
               */
              this.router.navigate(['/not-found'])
              return false
            }
            /**
             * If the user is not authenticated the user might
             * benefit from trying to log in.
             */
            this.router.navigate(['/login'])
            return false
          })
        )
      }),
      map(isAdmin => isAdmin))
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state)
  }
}
