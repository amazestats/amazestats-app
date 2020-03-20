import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  isAuthenticated(): boolean {
    return this.storageService.hasValidAccessToken()
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
    }).pipe(tap(res => this.storageService.setAccessToken(res.token)))
  }

  basicAuth(username: string, password: string): string {
    return btoa(`${username}:${password}`)
  }
}

interface TokenResponse {
  token: string,
  id: number,
}