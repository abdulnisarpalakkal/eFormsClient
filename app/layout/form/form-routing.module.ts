import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form.component';
import { FormDesignModalComponent } from './form-design-modal/form-design-modal.component';

const routes: Routes = [
    {
        path: 'form', component: FormComponent
    },
    {
        path: 'form-design/:id', component: FormDesignModalComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormRoutingModule {
}
