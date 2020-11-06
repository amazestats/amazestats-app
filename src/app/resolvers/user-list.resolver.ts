import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router'
import { User } from '@models/user'
import { UserService } from '@services/user.service'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class UserListResolver implements Resolve<User[]> {

  private users: User[] = []

  constructor(private userService: UserService) { }

  resolve(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<User[]> {
    return this.userService.getUsers()
  }
}
