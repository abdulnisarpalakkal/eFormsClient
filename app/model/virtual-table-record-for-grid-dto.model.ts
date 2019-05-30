import { VirtualRowRecordsDto } from "./virtual-row-records-dto.model";
import { VirtualTableFields } from "./virtual-table-fields.model";
import { FormDesign } from "./form-design.model";

export class VirtualTableRecordForGridDto {
    rowRecords:VirtualRowRecordsDto[];
    columns: VirtualTableFields[];
    formDesigns:FormDesign[];
}