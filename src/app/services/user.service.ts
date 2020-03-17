import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private username: string = null

  constructor(
    private auth: AuthenticationService,
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<any> {
    this.username = username
    return this.auth.updateAccessToken(username, password)
      .pipe(catchError(_ => this.username = null))
  }

  register(username: string, password: string): Observable<any> {
    this.username = username

    return this.http.post('/users', {
      alias: username,
      password: password,
    }).pipe(catchError(_ => this.username = null))
  }

  getCurrentUser(): string {
    return this.username
  }

  basicAuth(username: string, password: string): string {
    return btoa(`${username}:${password}`)
  }
}
