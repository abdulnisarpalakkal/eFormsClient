import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessComponent } from './process.component';
import { ProcessDetailsComponent } from './process-details/process-details.component';

const routes: Routes = [
    {
        path: '',
        component: ProcessComponent
        // children: [
        //     { path: 'process-det/:id', loadChildren : './process-submodule/process-submodule.module#ProcessSubmoduleModule' }
        // ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcessRoutingModule {
}
