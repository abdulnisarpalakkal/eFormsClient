import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule   }   from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { CategoryComponent } from './category.component';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { CategoryRoutingModule } from './category-routing.module';
import { PageHeaderModule,MsgViewModule } from '../../../shared';

@NgModule({
  imports: [
    CommonModule,CategoryRoutingModule,FormsModule
    ,NgxDatatableModule
    ,PageHeaderModule
   ,MsgViewModule
  ],
  declarations: [CategoryComponent, CategoryModalComponent]
})
export class CategoryModule { }
