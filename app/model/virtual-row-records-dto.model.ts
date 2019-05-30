import { VirtualTableRecords } from "./virtual-table-records.model";
import { VirtualTable } from "./virtual-table.model";

export class VirtualRowRecordsDto{
    public id:string;
	public records:VirtualTableRecords[] ;
	public pkValue:number;
	public virtualTableMaster:VirtualTable;
}