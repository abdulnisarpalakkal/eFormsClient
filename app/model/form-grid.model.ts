import { VirtualTable } from "./virtual-table.model";
import { VirtualTableFields } from "./virtual-table-fields.model";
import { VirtualRowRecordsDto } from "./virtual-row-records-dto.model";
import { FormDesign } from "./form-design.model";

export class FormGrid {
    public  id: number;
    public  add: boolean;
    public  edit: boolean;
    public  delete: boolean;
    public  attach: boolean;
    public virtualTableMasterId:number;
    public virtualTableFields:VirtualTableFields[]=[];
    public parentReferFieldId:number;
    public gridRecords:VirtualRowRecordsDto;
    public formDesignList:FormDesign[];

}