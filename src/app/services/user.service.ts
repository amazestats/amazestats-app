import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { AuthenticationService } from './authentication.service'
import { StorageService } from './storage.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userId: number = null

  constructor(
    private auth: AuthenticationService,
    private http: HttpClient,
    private storageService: StorageService,
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
      }))
  }

  logout() {
    this.storageService.clearUserDetails()
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post('/users', {
      alias: username,
      password: password,
    }).pipe(tap(_ => {
      // We have to save the token, otherwise the user would be forced to log
      // in as well after the registration to get the token.
      this.auth.updateAccessToken(username, password).subscribe(
        res => {
          this.setCurrentUser(res.id)
        },
        err => console.error("Failed to retreive token after registration.", err)
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

}
