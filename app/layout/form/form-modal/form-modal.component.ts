import { Component,EventEmitter, OnInit,Input,Output,OnChanges,SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';

import {VirtualTable} from '../../../model/virtual-table.model';
import { FormMaster } from '../../../model/form-master.model';
import { UserRoles } from '../../../model/user-roles.model';
import { UserMsg } from '../../../model/user-msg.model';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html'
 
})
export class FormModalComponent implements OnInit,OnChanges {

  @Input() form: FormMaster;
  @Output() updated = new EventEmitter<FormMaster>();
  @Input() msgOb:UserMsg=new UserMsg();
  @Input() isNew:boolean; 
  @Input() virtualTableList:VirtualTable[]=[]; 
  @Input() userRoles:UserRoles[];
  _virtualTableId:number;
  _userRoleSelectedIds:number[]=[];

  constructor() { }

  ngOnInit() {
    this._virtualTableId=this.form.virtualTableMaster?this.form.virtualTableMaster.id:0;
  }
  onUpdate(virtualTableForm:NgForm) {
    this.form.virtualTableMaster= this.virtualTableList.find(x=>x.id == this._virtualTableId);
    const userRolesSelected:UserRoles[]=[];
    this._userRoleSelectedIds.forEach((roleId,index) => {
      userRolesSelected[index]=this.userRoles.find(u=>u.id==roleId);
    });
    this.form.accessGroups=userRolesSelected;
    this.updated.emit(this.form);
  }
  onLoad(){
    this._userRoleSelectedIds=this.form.accessGroups.map(u =>u.id);
  }
  ngOnChanges(changes: SimpleChanges ){
    // console.log(changes);
    this.onLoad();
  }
  handleChange(event,userRole){
    var target = event.target;
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
}
