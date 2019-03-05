import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RefFieldFilterPipe } from './ref-field-filter.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [RefFieldFilterPipe],
    exports:[RefFieldFilterPipe]
})
export class SharedPipesModule { }
