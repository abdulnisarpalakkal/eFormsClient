import {FormMaster} from './form-master.model';
import {VirtualTableFields} from './virtual-table-fields.model';
import {FormComponentEnum} from './form-component.enum';
import { FormComponentRefValue } from './form-component-ref-value.model';
import { FormRule } from './form-rule';
import { FormGrid } from './form-grid.model';
import { FormComponent } from './form-component.model';

export class FormDesign {
    public  id: number;
  
    public componentName: string;
    public componentType: FormComponentEnum;

    public alignOrder: number;
    public hide: boolean;
    public formMaster: FormMaster;
    public formRules:FormRule[]=[];
    public formGrid:FormGrid;
    public formComponent:FormComponent;
}