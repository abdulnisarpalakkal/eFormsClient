import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule   }   from '@angular/forms';

import { FormDesignComponent } from './form-design.component';

@NgModule({
  declarations: [FormDesignComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[FormDesignComponent]
})
export class FormDesignModule { }
