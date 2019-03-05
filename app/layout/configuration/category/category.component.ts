import { Component, OnInit,ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';

import { routerTransition } from '../../../router.animations';
import {CategoryService,Handler} from '../../../shared';
import {Category} from '../../../model/category.model';
import { UserMsg } from '../../../model/user-msg.model';
import { MsgInterface } from '../../interface/msg-interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',

  animations: [routerTransition()]
})
export class CategoryComponent implements OnInit,MsgInterface {
  categories=[];
  temp = [];
  modalCategory: Category;
  public filter_Category: Category;

 
  submitted = false;
  closeResult: string;
  modalReference: any;
  msgOb:UserMsg=new UserMsg();
  
  categoryForm;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private categoryService: CategoryService,private modalService: NgbModal, private handler:Handler) { }

  ngOnInit() {
      this.getCategories();
      this.filter_Category=new Category();
      this.modalCategory=new Category();
  }
  public getCategories() {
      this.categoryService.get()
      .subscribe(
            data => {
              
              this.temp = [...data];
              this.categories=data;    
            },
            error=>{
              this.errorHandler(error);
            }
      );
  }
  updateFilter(event) {
    const firstName =  this.filter_Category.categoryName?this.filter_Category.categoryName.toLowerCase():"";
    
    var valid=false;
    // filter our data
    const temp = this.temp.filter(function(d) {
        valid= d.firstName.toLowerCase().indexOf(firstName) !== -1 || !firstName;
        return valid;
    });
    // update the rows
    this.categories = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
}
deleteUser(category){
    if(!confirm("Are you sure to delete "+category.categoryName)) {
        return;
    }
    this.submitted=true;
    this.categoryService.delete(category)
    .subscribe(
        data => {
          this.successHandler("Category "+category.categoryName+" deleted successfully");
          
          this.getCategories();
         
        },
        error=>{
            this.errorHandler(error);
            this.getCategories();
        }
    );
}
open(content,category,isNew) {
    this.msgOb.msg=null;
    if(!isNew)
      this.modalCategory=category;
    else
      this.modalCategory=new Category();
    this.submitted=false;
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
onUpdated(category: Category) {
    this.successHandler("Category "+category.categoryName+" Updated/Saved successfully");
    this.getCategories();
    this.closeModal();
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
// errorHandler(error)
// {
//     // this.msg=this.handler.getErrorMsg(error);
//     this.success=false;
//     this.msg_class="danger";
// }

}
