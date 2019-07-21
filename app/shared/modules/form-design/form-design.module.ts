import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule   }   from '@angular/forms';

import { FormDesignComponent } from './form-design.component';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';

@NgModule({
  declarations: [FormDesignComponent],
  imports: [
    CommonModule,
    FormsModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  exports:[FormDesignComponent]
})
export class FormDesignModule { }
