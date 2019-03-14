import { Component,EventEmitter, OnInit,Input,Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRoles } from '../../../../model/user-roles.model';
import { User } from '../../../../model/user.model';
import {AdministrationService, Handler} from '../../../../shared';
import { UserMsg } from '../../../../model/user-msg.model';

@Component({
  selector: 'app-user-role-modal',
  templateUrl: './user-role-modal.component.html'
})

export class UserRoleModalComponent implements OnInit {
  @Input() user: User;
  @Output() updatedUserRoles = new EventEmitter<User>();
  userRoles: UserRoles[]=[];
 _userRoleSelectedIds:number[];
  constructor(private administrationService:AdministrationService,private handler:Handler) { }

  ngOnInit() {
    this.getUserRoles();
  }
  onUpdate(userRoleAssignForm:NgForm) {
    const userRolesSelected:UserRoles[]=[];
    this._userRoleSelectedIds.forEach((roleId,index) => {
      userRolesSelected[index]=this.userRoles.find(u=>u.id==roleId);
    });
    this.user.userRoles=userRolesSelected;
    this.updatedUserRoles.emit(this.user);
  }
  handleChange(evt,userRole:UserRoles) {
    
    var target = evt.target;
    if(target.checked){
      this._userRoleSelectedIds.push(userRole.id);
    }
    else{
      const index = this._userRoleSelectedIds.indexOf(userRole.id, 0);
      if (index > -1) {
        this._userRoleSelectedIds.splice(index, 1);
      }
    }
    this._userRoleSelectedIds=[...this._userRoleSelectedIds];
   
  }
  getUserRoles() {
    this.administrationService.getUserRoles()
    .subscribe(
          data => {
            
            this.userRoles=data; 
            this.onLoad();   
          },
          error=>{
          }
    );
}
  onLoad(){
    this._userRoleSelectedIds=this.user.userRoles.map(u =>u.id);
  }
  
}
