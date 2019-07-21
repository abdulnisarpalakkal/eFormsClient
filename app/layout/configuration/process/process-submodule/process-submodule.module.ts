import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



import { ProcessSubmoduleRoutingModule } from './process-submodule-routing.module';
import { ProcessSubmoduleComponent } from './process-submodule.component';
import { PageHeaderModule } from './../../../../shared';
import {VirtualTableModule} from './../../virtual-table/virtual-table.module';
import {FormModule} from './../../../form/form.module';
import {WorkflowModule} from './../../../workflow/workflow.module';



@NgModule({
  declarations: [ProcessSubmoduleComponent],
  imports: [
    CommonModule,
    ProcessSubmoduleRoutingModule,
    PageHeaderModule,
    NgbModule,
    FormModule,
    VirtualTableModule,
    WorkflowModule
  ]
})
export class ProcessSubmoduleModule { }
