import { Injectable } from '@angular/core';
import { UserMsg } from '../../model/user-msg.model';

@Injectable()
export class GlobalData {
    public Server = 'http://localhost:8080/';
    public ApiUrl = 'api/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
    // public static userMsg:UserMsg=new UserMsg();

}