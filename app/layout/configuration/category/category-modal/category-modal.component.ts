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
  

  constructor(private categoryService: CategoryService,private handler:Handler) { }

  ngOnInit() {
    
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
          }
      );
    }
    
  }
  successHandler(category)
  {
   
    this.updated.emit(category);
  }
 

}
