import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthenticationResolver implements Resolve<boolean> {

  private isAuthenticated = false

  constructor(private authService: AuthenticationService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    this.authService.isAuthenticated().subscribe(
      isAuthenticated => { this.isAuthenticated = isAuthenticated },
      err => {
        console.error(err) // Maybe do something useful with this
        this.isAuthenticated = false
      }
    )
    return this.isAuthenticated
  }


}
