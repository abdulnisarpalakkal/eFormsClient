import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule   }   from '@angular/forms';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import {EqualValidator} from '../shared';

@NgModule({
  imports: [
    CommonModule,
    SignupRoutingModule,
    FormsModule      
  ],
  declarations: [SignupComponent,EqualValidator]
})
export class SignupModule { }
