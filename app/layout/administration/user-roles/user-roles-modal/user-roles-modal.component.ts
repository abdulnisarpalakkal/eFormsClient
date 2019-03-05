import { Component,EventEmitter, OnInit,Input,Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserRoles } from '../../../../model/user-roles.model';
import { UserMsg } from '../../../../model/user-msg.model';


@Component({
  selector: 'app-user-roles-modal',
  templateUrl: './user-roles-modal.component.html'
})
export class UserRolesModalComponent implements OnInit {
  @Input() userRole: UserRoles;
  @Output() updated = new EventEmitter<UserRoles>();
  @Input() msgOb:UserMsg=new UserMsg();
  @Input() isNew:boolean; 

  
  constructor() { }

  ngOnInit() {
  }
  onUpdate(userRoleForm:NgForm) {
    this.updated.emit(this.userRole);
  }
}
