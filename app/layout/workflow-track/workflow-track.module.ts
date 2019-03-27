import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule   }   from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { WorkflowTrackComponent } from './workflow-track.component';

@NgModule({
  declarations: [WorkflowTrackComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxDatatableModule
  ],
  exports:[WorkflowTrackComponent]
})
export class WorkflowTrackModule { }
