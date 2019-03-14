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
  
    constructor(private administrationService: AdministrationService) {
        
    }

    ngOnInit() {}
    onSignup(signupForm:NgForm) {
        this.administrationService.createUser(this.user)
        .subscribe(
           
              data => {
                console.log(data);
          
              },
              error=>{
                  console.log(error);
              
              }
        );
    }
   
}
