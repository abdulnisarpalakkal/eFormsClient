import { logging } from "protractor";
import { FormComponentRefValue } from "./form-component-ref-value.model";
import { FormDesign } from "./form-design.model";
import { VirtualTableFields } from "./virtual-table-fields.model";

export class FormComponent{
    public id:number;
    public componentLabel:string;
    public componentValue:string;
    public componentRefValues:FormComponentRefValue[]=[];
    public virtualTableField:VirtualTableFields;
    public formDesign:FormDesign
    
}