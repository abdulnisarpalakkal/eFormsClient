import {Component,EventEmitter, OnInit,Input,Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import {Category} from '../../../../model/category.model';
import {CategoryService, Handler} from '../../../../shared';
import { ThrowStmt } from '@angular/compiler';
import { UserMsg } from '../../../../model/user-msg.model';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.scss']
})
export class CategoryModalComponent implements OnInit {

  @Input() category: Category;
  @Output() updated = new EventEmitter<Category>();
  @Input() msgOb:UserMsg=new UserMsg();
  

  constructor(private categoryService: CategoryService,private handler:Handler) { }

  ngOnInit() {
    this.msgOb.msg=null;
  }

  onUpdate(categoryForm:NgForm) {
    if(!this.category.id)
    {
      this.categoryService.create(this.category)
      .subscribe(
          data => {
            this.successHandler(this.category);
          },
          error=>{
              this.errorHandler(error);
          }
      );
    }
    else
    {
      this.categoryService.update(this.category)
      .subscribe(
          data => {
            this.successHandler(this.category);
          },
          error=>{
              this.errorHandler(error);
          }
      );
    }
    
  }
  successHandler(category)
  {
   
    this.updated.emit(category);
  }
 errorHandler(error)
 {
    this.msgOb.msg=error;
    this.msgOb=this.handler.getErrorMsgObject(this.msgOb);
    
 }
  // errorHandler(error)
  // {
  //     this.submitted=true;
  //     if(error.status==400)
  //     {
  //         this.msg="invalid input"
  //     }
  //     else if(error.status==0)
  //     {
  //         this.msg="Unknown Error"
  //     }
  //     else
  //     {
  //         this.msg=error.error.message; 
  //     }
      
  //     this.msg_class="danger";
  // }

}
