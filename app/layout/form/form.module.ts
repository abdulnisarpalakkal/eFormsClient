import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule   }   from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {DragDropModule} from '@angular/cdk/drag-drop';

import { PageHeaderModule,MsgViewModule, FormDesignModule } from '../../shared';
import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form.component';
import { FormModalComponent } from './form-modal/form-modal.component';
import { FormDesignModalComponent } from './form-design-modal/form-design-modal.component';
import { FormComponentDirComponent,NgbdModalConfirm } from './directives/form-component-dir/form-component-dir.component';
import { ComponentPropertiesDirComponent } from './directives/component-properties-dir/component-properties-dir.component';
import { FormPreviewComponent } from './form-preview/form-preview.component';
import { FormRulesDirComponent } from './directives/form-rules-dir/form-rules-dir.component';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { FormDesignSidenavComponent } from './form-design-sidenav/form-design-sidenav.component';

@NgModule({
  imports: [
    CommonModule
    ,CommonModule,FormsModule
    ,NgxDatatableModule
    ,PageHeaderModule
    ,NgbModule
    ,FormRoutingModule
    ,DragDropModule
    ,MsgViewModule
    ,FormDesignModule
    ,MDBBootstrapModulesPro.forRoot()
  ],
  declarations: [FormComponent, FormModalComponent, FormDesignModalComponent, FormComponentDirComponent, ComponentPropertiesDirComponent,NgbdModalConfirm, FormPreviewComponent, FormRulesDirComponent,FormDesignSidenavComponent],
  entryComponents: [NgbdModalConfirm],
  exports:[FormComponent,FormDesignModalComponent]
})
export class FormModule { }
