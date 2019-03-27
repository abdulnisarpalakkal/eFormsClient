import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
// import { ProcessDetailsComponent } from './configuration/process/process-details/process-details.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'workflow-dashboard' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'workflow-dashboard', loadChildren: './workflow-dashboard/workflow-dashboard.module#WorkflowDashboardModule' },
            { path: 'administration', loadChildren: './administration/administration.module#AdministrationModule' },
            { path: 'category', loadChildren: './configuration/category/category.module#CategoryModule' },
            { path: 'process', loadChildren: './configuration/process/process.module#ProcessModule' 
            },
            { path: 'virtual-table', loadChildren: './configuration/virtual-table/virtual-table.module#VirtualTableModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'form', loadChildren: './form/form.module#FormModule' },
            { path: 'workflow', loadChildren: './workflow/workflow.module#WorkflowModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'process-det/:id/:processName', loadChildren : './configuration/process/process-submodule/process-submodule.module#ProcessSubmoduleModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
            
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
