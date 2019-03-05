import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { routerTransition } from '../router.animations';
import {User} from '../model/user.model';
import {AdministrationService} from '../shared';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
    user=new User();
    signupForm;
    // msg      : string;
    success  =false;
    submitted = false;
    msg="";
    msg_class="danger";
    constructor(private administrationService: AdministrationService) {
        
    }

    ngOnInit() {}
    onSignup(signupForm:NgForm) {
        this.submitted = true;
        this.administrationService.createUser(this.user)
        .subscribe(
           
              data => {
                console.log(data);
                this.success=true;
                this.msg_class="success";
                this.msg="User created successfully"; 
               
              },
              error=>{
                  console.log(error);
                  this.msg=error.error.message; 
                  this.success=false;
                  this.msg_class="danger";
              }
        );
    }
   
}
