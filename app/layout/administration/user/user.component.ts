import { Component, OnInit,ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';

import { routerTransition } from '../../../router.animations';
import {AdministrationService, Handler} from '../../../shared';
import {User} from '../../../model/user.model';
import { MsgInterface } from '../../interface/msg-interface';
import { UserMsg } from '../../../model/user-msg.model';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    animations: [routerTransition()]
})
export class UserComponent implements OnInit,MsgInterface {
    users=[];
    temp = [];
    
    public fil_User: User;
    msgOb:UserMsg=new UserMsg();
    closeResult: string;
    modalReference: any;
    modalReference2: any;
    modalUser: User;
    signupForm;
    @ViewChild(DatatableComponent) table: DatatableComponent;
   
    

    constructor(private userService: AdministrationService,private modalService: NgbModal, private handler:Handler) {
       
    }

    ngOnInit() {

        this.getUsers();
        this.fil_User=new User();
        this.modalUser=new User();
    }
    getUsers() {
        this.userService.getUsers()
        .subscribe(
              data => {
                this.temp = [...data];
                this.users=data;    
              },
              error=>{
                this.errorHandler(error);
              }
        );
    }
    updatedUserRoles(user: User) {
      
        
          this.userService.updateUserUserRoles(user)
          .subscribe(
              data => {
                this.successHandler("User Roles updated successfully");  
                this.closeUserRolesModal();
                this.getUsers();
              },
              error=>{
                  this.errorHandler(error);
              }
          );
        
      
      
      }
      
    updateFilter(event) {
        const firstName =  this.fil_User.firstName?this.fil_User.firstName.toLowerCase():"";
        const lastName =this.fil_User.lastName?this.fil_User.lastName.toLowerCase():""; ;
        const email =this.fil_User.email?this.fil_User.email.toLowerCase():"" ;
        var valid=false;
        // filter our data
        const temp = this.temp.filter(function(d) {
            valid= d.firstName.toLowerCase().indexOf(firstName) !== -1 || !firstName;
            valid=valid && (d.lastName.toLowerCase().indexOf(lastName) !== -1 || !lastName);
            valid=valid && (d.email.toLowerCase().indexOf(email) !== -1 || !email);
            return valid;
        });
        // update the rows
        this.users = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }
    deleteUser(user:User){
        if(!confirm("Are you sure to delete "+user.firstName)) {
            return;
        }
        this.userService.deleteUser(user)
        .subscribe(
            data => {
              this.successHandler(user.firstName+ " deleted successfully");
              this.getUsers();
             
            },
            error=>{
                this.errorHandler(error);
                this.getUsers();
            }
        );
    }


    open(content,user,isNew) {
        this.msgOb.msg=null;
        this.modalUser=isNew?new User(): user;
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

    openUserRolesModal(content,user) {
        this.msgOb.msg=null;
        this.modalUser=user;
        this.modalReference2=this.modalService.open(content);
        
        this.modalReference2.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
           
        });
    }
    closeUserRolesModal() {
        this.modalReference2.close();

    }
    


    onUpdated(user: User) {
        this.successHandler(user.firstName+ " updated successfully");
        this.getUsers();
        this.closeModal();
    }
    assignRolesClick(content,user){
        this.openUserRolesModal(content,user);
    }
    onUpdatedUserRoles(user: User) {
        this.updatedUserRoles(user);
       
    }
    successHandler(msg)
    {
    
        this.msgOb.msg=msg;
        this.msgOb=this.handler.getSuccessMsgObject(this.msgOb);
    }
    errorHandler(error)
    {
        this.msgOb.msg=error;
        this.msgOb=this.handler.getErrorMsgObject( this.msgOb);
        
    }
   
    
}
