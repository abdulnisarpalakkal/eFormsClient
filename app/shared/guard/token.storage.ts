import { Injectable } from '@angular/core';


const TOKEN_KEY = 'AuthToken';
const USER='User'

@Injectable()
export class TokenStorage {

  constructor() { }

  signOut() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER);
    window.sessionStorage.clear();
  }

  public saveToken(token: string, user: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
    window.sessionStorage.setItem(USER,  user);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public getUser(): string {
    return sessionStorage.getItem(USER);
  }
}
