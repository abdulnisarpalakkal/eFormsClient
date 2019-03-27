import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule   }   from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProcessComponent } from './process.component';
import { ProcessModalComponent } from './process-modal/process-modal.component';
import { ProcessRoutingModule } from './process-routing.module';
import { PageHeaderModule,MsgViewModule } from '../../../shared';
import {VirtualTableModule} from './../virtual-table/virtual-table.module';
import { ProcessDetailsComponent } from './process-details/process-details.component';




@NgModule({
  imports: [
    CommonModule,ProcessRoutingModule,FormsModule
    ,NgxDatatableModule
    ,PageHeaderModule
    ,NgbModule.forRoot()
    ,MsgViewModule
    ,VirtualTableModule
   
   
  ],
  declarations: [ProcessComponent, ProcessModalComponent,ProcessDetailsComponent]
})
export class ProcessModule { }
