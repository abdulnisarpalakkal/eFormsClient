import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import {MsgViewModule} from './../shared/modules/msg-view/msg-view.module';

@NgModule({
    imports: [CommonModule, LoginRoutingModule,FormsModule,MsgViewModule],
    declarations: [LoginComponent]
})
export class LoginModule {}
