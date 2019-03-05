import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowDashboardComponent } from './workflow-dashboard.component';

const routes: Routes = [
    {
        path: '', component: WorkflowDashboardComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WorkflowDashboardRoutingModule {
}
