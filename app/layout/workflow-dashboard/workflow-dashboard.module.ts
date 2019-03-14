import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule   }   from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { WorkflowDashboardComponent } from './workflow-dashboard.component';
import { WorkflowDashboardRoutingModule } from './workflow-dashboard-routing.module';
import { PageHeaderModule,MsgViewModule } from '../../shared';
import { WorkflowFormViewComponent } from './workflow-form-view/workflow-form-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WorkflowDashboardRoutingModule,
    PageHeaderModule,
    MsgViewModule,
    NgxDatatableModule
  ],
  declarations: [WorkflowDashboardComponent, WorkflowFormViewComponent]
})
export class WorkflowDashboardModule { }
