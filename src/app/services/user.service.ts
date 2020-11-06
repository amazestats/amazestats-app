import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { tap, map, catchError } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { AuthenticationService } from './authentication.service'
import { StorageService } from './storage.service'
import { User } from '@models/user'
import { CompetitionService } from './competition.service'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userId: number = null

  constructor(
    private auth: AuthenticationService,
    private competitionService: CompetitionService,
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router,
  ) {
    try {
      this.userId = this.storageService.getCurrentUser()
    } catch (err) {
      // most likely means storage had not been written to
      console.debug(err)
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.auth.updateAccessToken(username, password)
      .pipe(tap(res => {
        this.setCurrentUser(res.id)
        this.auth.setAuthenticatedStatus(true)
      }))
  }

  logout() {
    this.storageService.clearUserDetails()
    this.auth.setAuthenticatedStatus(false)
    this.userId = null
    this.router.navigate(['/home'])
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post('/users', {
      alias: username,
      password,
    }).pipe(tap(_ => {
      // We have to save the token, otherwise the user would be forced to log
      // in as well after the registration to get the token.
      this.auth.updateAccessToken(username, password).subscribe(
        res => {
          this.setCurrentUser(res.id)
          this.auth.setAuthenticatedStatus(true)
        },
        err => console.error('Failed to retreive token after registration.', err)
      )
    }))
  }

  setCurrentUser(userId: number) {
    this.userId = userId
    this.storageService.setCurrentUser(userId)
  }

  getCurrentUser(): number {
    return this.userId
  }

  getUser(userId: number): Observable<User> {
    return this.http.get<{ user: User }>(`/users/${userId}`)
      .pipe(map(res => res.user))
  }

  getUsers(): Observable<User[]> {
    return this.http.get<{ users: User[] }>(`/users`)
      .pipe(map(res => res.users))
  }

  isAdmin(): Observable<boolean> {
    return this.competitionService.getAdmins()
      .pipe(map(
        admins => {
          return admins.filter(
            admin => admin.id === this.userId
          ).length > 0
        }
      ))
  }

}
