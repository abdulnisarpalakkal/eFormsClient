import {FormMaster} from './form-master.model';
import {VirtualTableFields} from './virtual-table-fields.model';
import {FormComponentEnum} from './form-component.enum';
import { FormComponentRefValue } from './form-component-ref-value.model';
export class FormDesign {
    public  id: number;
  
    public componentName: string;
    public componentLabel: string;
    public componentType: FormComponentEnum;

    public alignOrder: number;
    public hide: boolean;
    public componentValue:string;
    public componentRefValues:FormComponentRefValue[];
    public formMaster: FormMaster;
    public virtualTableField: VirtualTableFields;
}