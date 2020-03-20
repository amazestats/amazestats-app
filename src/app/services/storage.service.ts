import { Injectable } from '@angular/core';

const ACCESS_TOKEN_STORAGE = 'TOKEN'
const USER_ID_STORAGE = 'USER_ID'

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  clearUserDetails() {
    localStorage.setItem(ACCESS_TOKEN_STORAGE, "")
    localStorage.setItem(USER_ID_STORAGE, "")
  }

  getAccessToken(): string {
    return localStorage.getItem(ACCESS_TOKEN_STORAGE)
  }

  hasValidAccessToken(): boolean {
    let token = this.getAccessToken()
    return token != null && token != ""
  }

  setAccessToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN_STORAGE, token)
  }

  getCurrentUser(): number {
    let userId = localStorage.getItem(USER_ID_STORAGE)
    if (this.isValidNumber(userId)) {
      return Number(userId)
    }

    throw Error("No user ID in storage.")
  }

  setCurrentUser(userId: number) {
    localStorage.setItem(USER_ID_STORAGE, String(userId))
  }

  private isValidNumber(num: string): boolean {
    return num != null && num !== "" && !Number.isNaN(Number(num))
  }
}
