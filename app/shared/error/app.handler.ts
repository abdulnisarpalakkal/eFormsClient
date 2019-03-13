
import { Injectable, ErrorHandler,Component,Input } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import { UserMsg } from '../../model/user-msg.model';
import { NgbModal,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {MessageService} from '../services';

@Injectable()
export class Handler implements ErrorHandler  {
    msgOb:UserMsg=new UserMsg();
    // msg:string="";
    constructor( private messageService: MessageService){
        
    }
   
    public getSuccessMsg(moduleName,moduleValue,operation)
    {
        return moduleName+" "+moduleValue+" "+ operation+" successfully"; 
    }
    public getErrorMsg(err: HttpErrorResponse):String {

        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // server-side error
          errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
         
        } else {
           // client-side error
           errorMessage = `Error: ${err.error.message}`;
        }
    
        
        return errorMessage;
      }
    // public getErrorMsg(error) {
    //     if(error.error.message)
    //         this.msg=error.error.message;
    //     else if(error.status==400)
    //         this.msg="invalid input";
    //     else
    //         this.msg="Unknown Error";
    //     return this.msg;
    // }
    handleError(handle:any){
      
        // const modalRef = this.modalService.open(NgbdModalContent,{ size: 'lg' });
        // modalRef.componentInstance.name = 'World';
        // alert('handle');
        if(handle  instanceof(UserMsg)){
          // this.msgOb= this.getErrorMsgObject(this.msgOb);
          this.messageService.sendMessage(handle);
        }
        else if(handle  instanceof(Error)){
          var msgObj= new UserMsg();
          msgObj.msg=handle.message;
          
          msgObj=this.getSuccessMsgObject(msgObj);
          this.messageService.sendMessage(msgObj);
        }
        else
          console.error(handle);
        // if(handle.error!=null){
        //    this.msgOb.msg= this.getErrorMsg(handle);
        //    this.msgOb.success=false;
        //    this.msgOb.msg_class="danger";
        //    this.messageService.sendMessage(this.msgOb);
        // }
        // else if(handle.success){
        //     this.msgOb.msg= this.getErrorMsg(handle);
        //     this.msgOb.success=true;
        //     this.msgOb.msg_class="success";
        //     this.messageService.sendMessage(this.msgOb);
        // }
        // else
        //     console.error(handle);
           
    }
    
    public getErrorMsgObject(msgOb:UserMsg){
      
        msgOb.success=false;
        msgOb.msg_class="danger";
        return msgOb;

    }
    public getSuccessMsgObject(msgOb:UserMsg){
      
        msgOb.success=true;
        msgOb.msg_class="success";
        return msgOb;

    }
   
}
