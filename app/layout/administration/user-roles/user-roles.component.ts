

import { Component, OnInit,ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';

import { routerTransition } from '../../../router.animations';
import {AdministrationService,Handler} from '../../../shared';
import {UserRoles} from '../../../model/user-roles.model';
import { MsgInterface } from '../../interface/msg-interface';
import { UserMsg } from '../../../model/user-msg.model';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  animations: [routerTransition()]
})
export class UserRolesComponent implements OnInit {
  userRoles:UserRoles[]=[];
  temp = [];
  modalUserRoles: UserRoles;
  public filter_UserRole: UserRoles;

  closeResult: string;
  modalReference: any;
  
  isNew :boolean=false;
  userRolesForm;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private administrationService: AdministrationService,private modalService: NgbModal, private handler:Handler) { }

  ngOnInit() {
      this.getUserRoles();
      this.filter_UserRole=new UserRoles();
      this.modalUserRoles=new UserRoles();
  }
  public getUserRoles() {
      this.administrationService.getUserRoles()
      .subscribe(
            data => {
              this.temp = [...data];
              this.userRoles=data;    
            },
            error=>{
            }
      );
  }
  updateFilter(event) {
    const type =  this.filter_UserRole.type?this.filter_UserRole.type.toLowerCase():"";
    
    var valid=false;
    // filter our data
    const temp = this.temp.filter(function(d) {
        valid= d.type.toLowerCase().indexOf(type) !== -1 || !type;
        return valid;
    });
    // update the rows
    this.userRoles = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
}
deleteUser(userRoles:UserRoles){
    if(!confirm("Are you sure to delete "+userRoles.type)) {
        return;
    }
    this.administrationService.deleteUserRoles(userRoles)
    .subscribe(
        data => {
          this.getUserRoles();
         
        },
        error=>{
            this.getUserRoles();
        }
    );
}

onUpdated(userRoles: UserRoles) {
      
    if(this.isNew)
    {
      
      
      this.administrationService.createUserRoles(userRoles)
      .subscribe(
          data => {
            this.closeModal();
            this.getUserRoles();
          },
          error=>{
          }
      );
    }
    else
    {
      this.administrationService.updateUserRoles(userRoles)
      .subscribe(
          data => {
            this.closeModal();
            this.getUserRoles();
          },
          error=>{
          }
      );
    }
  
  
  }


open(content,userRoles,isNew) {
    this.isNew=isNew;
    if(!isNew)
      this.modalUserRoles=userRoles;
    else
      this.modalUserRoles=new UserRoles();
    this.modalReference=this.modalService.open(content);
    
    this.modalReference.result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
}
closeModal() {
    this.modalReference.close();

}
private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
}


}

