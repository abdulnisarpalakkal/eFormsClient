import {Component,EventEmitter, OnInit,Input,Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

import {Process} from '../../../../model/process.model';
import {Category} from '../../../../model/category.model';
import {ProcessService,CategoryService,Handler} from '../../../../shared';
import { MsgInterface } from '../../../interface/msg-interface';
import { UserMsg } from '../../../../model/user-msg.model';


@Component({
  selector: 'app-process-modal',
  templateUrl: './process-modal.component.html',
  styleUrls: ['./process-modal.component.scss']
})
export class ProcessModalComponent implements OnInit,MsgInterface {
  @Input() process: Process;
  @Input() msgOb:UserMsg=new UserMsg();
  _categoryId:number;
  @Output() updated = new EventEmitter<Process>();

  categories:Array<Category>=[];

  constructor(private processService: ProcessService,private categoryService: CategoryService
    , private handler:Handler) { }

  ngOnInit() {
    this.getCategories();
    this._categoryId=this.process.category?this.process.category.id:0; 
  }
  onUpdate(processForm:NgForm) {

    this.process.category= this.categories.find(x=>x.id == this._categoryId);
    if(!this.process.id)
    {
      this.processService.create(this.process)
      .subscribe(
          data => {
            this.successHandler("Process "+this.process.processName+" created successfully");
          },
          error=>{
              this.errorHandler(error);
          }
      );
    }
    else
    {
      this.processService.update(this.process)
      .subscribe(
          data => {
            this.successHandler("Process "+this.process.processName+" updated successfully");
          },
          error=>{
              this.errorHandler(error);
          }
      );
    }
    
  }
  public  getCategories() {
    this.categoryService.get()
    .subscribe(
          data => {
            this.categories= data;    
          },
          error=>{
            this.categories=null;
          }
    );
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
