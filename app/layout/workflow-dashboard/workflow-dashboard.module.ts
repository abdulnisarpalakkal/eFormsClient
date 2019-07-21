import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule   }   from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { WorkflowDashboardComponent } from './workflow-dashboard.component';
import { WorkflowDashboardRoutingModule } from './workflow-dashboard-routing.module';
import { PageHeaderModule,MsgViewModule,FormDesignModule } from '../../shared';
import { WorkflowFormViewComponent } from './workflow-form-view/workflow-form-view.component';
import { WorkflowModule } from '../workflow/workflow.module';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WorkflowDashboardRoutingModule,
    PageHeaderModule,
    MsgViewModule,
    NgxDatatableModule,
    WorkflowModule,
    FormDesignModule,
    MDBBootstrapModulesPro.forRoot(),
    SharedComponentsModule
  ],
  declarations: [WorkflowDashboardComponent, WorkflowFormViewComponent]

})
export class WorkflowDashboardModule { }
