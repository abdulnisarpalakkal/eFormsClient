
import { Injectable, ErrorHandler } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import { UserMsg } from './../../model/user-msg.model';




@Injectable()
export class Handler {
    // msg:string="";
    constructor( ){

    }
    public getSuccessMsg(moduleName,moduleValue,operation)
    {
        return moduleName+" "+moduleValue+" "+ operation+" successfully"; 
    }
    // public getErrorMsg(err: HttpErrorResponse):String {

    //     let errorMessage = '';
    //     if (err.error instanceof ErrorEvent) {
    //         // server-side error
    //       errorMessage = `Error Code: ${err.status}\nMessage: ${err.message}`;
         
    //     } else {
    //        // client-side error
    //        errorMessage = `Error: ${err.error.message}`;
    //     }
    
        
    //     return errorMessage;
    //   }
    // public getErrorMsg(error) {
    //     if(error.error.message)
    //         this.msg=error.error.message;
    //     else if(error.status==400)
    //         this.msg="invalid input";
    //     else
    //         this.msg="Unknown Error";
    //     return this.msg;
    // }
    // handleError(handle:any){

    //     GlobalData.userMsg.show=true;
    //     if(handle.error!=null){
    //         GlobalData.userMsg.msg= this.getErrorMsg(handle);
    //         GlobalData.userMsg.success=false;
    //         GlobalData.userMsg.msg_class="danger";
            
    //     }
    //     else if(handle.success){
    //         GlobalData.userMsg.msg = this.getSuccessMsg(handle.userMsg.moduleName
    //             ,handle.userMsg.moduleValue,handle.userMsg.operation);
    //             GlobalData.userMsg.msg_class="success";
    //             GlobalData.userMsg.success=true;
    //     }
    //     else
    //         console.error(handle);
           
    // }
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
