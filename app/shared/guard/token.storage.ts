import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken';
const USER='User'
const TENANT_ID='tenantId'

@Injectable()
export class TokenStorage {

  constructor(private router:Router) { }

  signOut() {
    const tenantId=this.getTenantId();
   
    this.clearSessions();
    this.router.navigate(['/login/'+tenantId]);
    
  }
  clearSessions(){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER);
    // window.sessionStorage.removeItem(TENANT_ID);
    window.sessionStorage.clear();
  }

  public saveToken(token: string, user: string,tenantId:string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(USER);
    window.sessionStorage.removeItem(TENANT_ID);
    window.sessionStorage.setItem(TOKEN_KEY,  token);
    window.sessionStorage.setItem(USER,  user);
    window.sessionStorage.setItem(TENANT_ID,  tenantId);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public getUser(): string {
    return sessionStorage.getItem(USER);
  }
  public getTenantId(): string {
    return sessionStorage.getItem(TENANT_ID);
  }
  public setTenantId(tenantId:string) {
    window.sessionStorage.removeItem(TENANT_ID);
    window.sessionStorage.setItem(TENANT_ID,  tenantId);
  }
}
