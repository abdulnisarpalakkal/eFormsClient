import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VirtualTableComponent } from './virtual-table.component';

const routes: Routes = [
    {
        path: '', component: VirtualTableComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class VirtualTableRoutingModule {
}
