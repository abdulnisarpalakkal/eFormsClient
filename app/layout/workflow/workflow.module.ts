import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { FormsModule, ReactiveFormsModule   }   from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { PageHeaderModule,MsgViewModule } from '../../shared';
import { WorkflowComponent } from './workflow.component';
import { WorkflowRoutingModule } from './workflow-routing.module';
import { WorkflowModalComponent } from './workflow-modal/workflow-modal.component';
import { WorkflowDesignComponent } from './workflow-design/workflow-design.component';
import { WorkflowNodePropertiesDirComponent } from './directives/workflow-node-properties-dir/workflow-node-properties-dir.component';
import { WorkflowLinkPropertiesDirComponent } from './directives/workflow-link-properties-dir/workflow-link-properties-dir.component';
import { ActionEventPropertiesComponent, NgbdModalConfirm } from './directives/action-event-properties/action-event-properties.component';
import { WorkflowTrackComponent } from './workflow-track/workflow-track.component';
import { WorkflowTrackMasterComponent } from './workflow-track-master/workflow-track-master.component';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { WorkflowDesignSidenavComponent } from './workflow-design-sidenav/workflow-design-sidenav.component';

@NgModule({
  imports: [
    CommonModule,FormsModule,
    NgxChartsModule,
    NgxGraphModule,
    WorkflowRoutingModule,
    PageHeaderModule,
    NgbModule,
    NgxDatatableModule,
    MsgViewModule,
    MDBBootstrapModulesPro.forRoot(),
    ReactiveFormsModule
 
  ],
  declarations: [WorkflowComponent, WorkflowModalComponent, WorkflowDesignComponent, WorkflowNodePropertiesDirComponent
    , WorkflowLinkPropertiesDirComponent, ActionEventPropertiesComponent,NgbdModalConfirm,WorkflowTrackComponent
    , WorkflowTrackMasterComponent, WorkflowDesignSidenavComponent]
  ,entryComponents: [NgbdModalConfirm],
  exports:[WorkflowComponent,WorkflowTrackComponent,WorkflowTrackMasterComponent]
})
export class WorkflowModule { }
