import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import { User } from '../../model/user.model';
import { GlobalData } from '../configuration';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class AdministrationService {
  private userUrl :string;
  private userRolesUrl :string;
  constructor(private http:HttpClient,private _configuration: GlobalData) { 
    this.userUrl = _configuration.Server;
    this.userRolesUrl = _configuration.Server+"userRole";
  }
  

  attemptAuth(ussername: string, password: string): Observable<any> {
    const credentials = {username: ussername, password: password};
    
    return this.http.post(this.userUrl+'token/generate-token', credentials);
  }

  // user
  public createUser(user) {
    return this.http.post(this.userUrl+"token/signup",user);
  }
 
  public getUsers(): Observable<any> {
    console.log(this.userUrl);
    return this.http.get(this.userUrl + 'user/users');
  }

  public deleteUser(user) {
    return this.http.delete(this.userUrl + "user/users/"+ user.id);
  }
  public updateUser(user) {
    return this.http.put(this.userUrl + "user/users",user);
  }
  public updateUserUserRoles(user) {
    return this.http.put(this.userUrl + "user/users/userRoles",user);
  }
  // user roles
  public createUserRoles(userRole) {
    return this.http.post(this.userRolesUrl+"/userRoles",userRole);
  }
 
  public getUserRoles(): Observable<any> {
    return this.http.get(this.userRolesUrl + '/userRoles');
  }

  public deleteUserRoles(userRole) {
    return this.http.delete(this.userRolesUrl + "/userRoles/"+ userRole.id);
  }
  public updateUserRoles(userRole) {
    console.log(this.userRolesUrl);
    return this.http.put(this.userRolesUrl + "/userRoles",userRole);
  }


}
