import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class GlobalData {
    public Server = environment.baseUrl;
    public ApiUrl = 'api/';
    public ServerWithApiUrl = this.Server + this.ApiUrl;
    // public static userMsg:UserMsg=new UserMsg();

}