import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private username: string = null

  constructor() { }

  login(username: string, password: string): Promise<string> {
    this.username = username
    return Promise.resolve(username)
  }

  getCurrentUser(): string {
    return this.username
  }
}
