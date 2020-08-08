import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user = new BehaviorSubject<boolean>(false)
  private isLoggedIn = this.user.asObservable()

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) {
    /**
     * Make sure that we are up-to-date with information from previous
     * sessions.
     */
    this.user.next(this.storageService.hasValidAccessToken())
  }

  setAuthenticatedStatus(status: boolean) {
    this.user.next(status)
  }

  isAuthenticated(): Observable<boolean> {
    return this.isLoggedIn
  }

  getAccessToken(): string {
    return this.storageService.getAccessToken()
  }

  updateAccessToken(
    username: string,
    password: string
  ): Observable<TokenResponse> {
    return this.http.post<TokenResponse>('/token', null, {
      headers: new HttpHeaders().set(
        'Authorization', `Basic ${this.basicAuth(username, password)}`
      )
    }).pipe(tap(res => {
      this.storageService.setAccessToken(
        res.token,
        new Date(res["expiration-date"]))
    }))
  }

  basicAuth(username: string, password: string): string {
    return btoa(`${username}:${password}`)
  }
}

interface TokenResponse {
  token: string,
  id: number,
  'expiration-date': string,
}