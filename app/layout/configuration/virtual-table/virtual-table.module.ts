import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule   }   from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PageHeaderModule,MsgViewModule } from '../../../shared';
import { VirtualTableRoutingModule } from './virtual-table-routing.module';
import { VirtualTableComponent } from './virtual-table.component';
import { VirtualTableModalComponent } from './virtual-table-modal/virtual-table-modal.component';
import { VirtualTableFieldsComponent } from './virtual-table-modal/virtual-table-fields/virtual-table-fields.component';
import { VirtualTableConstraintsComponent } from './virtual-table-modal/virtual-table-constraints/virtual-table-constraints.component';
import {SharedPipesModule} from './../../../shared/pipes/shared-pipes.module';
@NgModule({
  imports: [
    CommonModule,
    VirtualTableRoutingModule,
    CommonModule,FormsModule
    ,NgxDatatableModule
    ,PageHeaderModule
    ,NgbModule.forRoot()
    ,SharedPipesModule
    ,MsgViewModule
  ],
  declarations: [VirtualTableComponent, VirtualTableModalComponent, VirtualTableFieldsComponent, VirtualTableConstraintsComponent],
  exports:[VirtualTableComponent]
})
export class VirtualTableModule { }
