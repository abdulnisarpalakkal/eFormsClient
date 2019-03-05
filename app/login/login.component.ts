import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {AdministrationService,Handler} from '../shared';
import {TokenStorage} from '../shared/guard';
import { UserMsg } from '../model/user-msg.model';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    constructor(private administrationService: AdministrationService,public router: Router
        , private token: TokenStorage,private handler:Handler) {}
    username : string
    password : string
    success  : boolean
    msgOb:UserMsg=new UserMsg();
    ngOnInit() {
        this.success=true;
    }
   
    onLoggedin() {
        this.token.signOut();
        this.administrationService.attemptAuth(this.username, this.password).subscribe(

            data => {
              console.log(data);
              this.token.saveToken(data.token,this.username);
              this.router.navigate(['workflow-dashboard']);
            },
            error=>{
               
                this.errorHandler(error);
            }
            
          );
        
    }
    errorHandler(error)
    {
        this.msgOb.msg=error;
        this.msgOb=this.handler.getErrorMsgObject(this.msgOb);
        
    }
   
}
