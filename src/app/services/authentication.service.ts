import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const ACCESS_TOKEN_STORAGE = 'TOKEN'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  getAccessToken(): string {
    return localStorage.getItem(ACCESS_TOKEN_STORAGE)
  }

  setAccessToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN_STORAGE, token)
  }

  updateAccessToken(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/token', null, {
      headers: new HttpHeaders().set(
        'Authorization', `Basic ${this.basicAuth(username, password)}`
      )
    }).pipe(tap(res => this.setAccessToken(res.token)))
  }

  basicAuth(username: string, password: string): string {
    return btoa(`${username}:${password}`)
  }
}
