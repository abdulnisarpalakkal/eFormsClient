import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowComponent } from './workflow.component';
import { WorkflowDesignComponent } from './workflow-design/workflow-design.component';

const routes: Routes = [
    {
        path: 'workflow', component: WorkflowComponent
    },
    {
        path: 'workflow-design/:id', component: WorkflowDesignComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkflowRoutingModule {
}
