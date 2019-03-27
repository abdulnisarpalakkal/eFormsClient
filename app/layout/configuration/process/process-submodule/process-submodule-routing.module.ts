import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessSubmoduleComponent } from './process-submodule.component';

const routes: Routes = [
  {
      path: '', component: ProcessSubmoduleComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessSubmoduleRoutingModule { }
