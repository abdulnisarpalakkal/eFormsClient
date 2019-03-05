import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsgViewComponent } from './msg-view.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MsgViewComponent],
  exports:[MsgViewComponent]
})
export class MsgViewModule { }
