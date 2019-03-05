import { Component,EventEmitter, OnInit,Input,Output } from '@angular/core';
import {User} from '../../../../model/user.model';
import { NgForm } from '@angular/forms';
import {AdministrationService, Handler} from '../../../../shared';
import { UserMsg } from '../../../../model/user-msg.model';

@Component({
    selector: 'app-user-modal',
    templateUrl: './usermodal.component.html'
})
export class UserModalComponent implements OnInit {
   
    @Input() user: User;
    @Input() msgOb:UserMsg=new UserMsg();
    @Output() updated = new EventEmitter<User>();

    constructor(private administrationService: AdministrationService,private handler:Handler) {}

    ngOnInit() {}
    onUpdate(signupForm:NgForm) {
        var op=this.user.id?this.administrationService.updateUser(this.user)
        :this.administrationService.createUser(this.user);
        op.subscribe(
            data => {
              this.successHandler(this.user);
            },
            error=>{
                this.errorHandler(error);
            }
        );
    }

    successHandler(user)
    {
        this.updated.emit(user);
    }
    errorHandler(error)
    {
        this.msgOb.msg=error;
        this.msgOb=this.handler.getErrorMsgObject( this.msgOb);
        
    }
}