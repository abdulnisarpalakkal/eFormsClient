import { Component, OnInit, Input } from '@angular/core';
import { KeyValuePipe  } from '@angular/common';
import { VirtualTableService } from '../../../../shared';
import { VirtualTableFields } from '../../../../model/virtual-table-fields.model';
import { VirtualTableRecords } from '../../../../model/virtual-table-records.model';
import { VirtualTable } from '../../../../model/virtual-table.model';
import { FormDesign } from '../../../../model/form-design.model';
import { FormMaster } from '../../../../model/form-master.model';
import { VirtualRowRecordsDto } from '../../../../model/virtual-row-records-dto.model';

@Component({
  selector: 'app-virtual-table-record',
  templateUrl: './virtual-table-record.component.html',
  styleUrls: ['./virtual-table-record.component.scss']
})
export class VirtualTableRecordComponent implements OnInit {
  @Input() selectedVirtualTable:VirtualTable;
  rowRecords:VirtualRowRecordsDto[];
  columns:VirtualTableFields[] = [];
  newRecordMap:Map<string,VirtualTableRecords>=new Map();
  formDesigns:FormDesign[]=[];
  form:FormMaster;
  constructor(private virtualTableService:VirtualTableService,private keyValuePipe:KeyValuePipe) { }

  ngOnInit() {
    this.getVirtualTableRecords(this.selectedVirtualTable.id);
  }
  public getVirtualTableRecords(tableId:number){
    this.virtualTableService.getDataRecordsByTable(tableId).subscribe(data=>{
      this.rowRecords=data.rowRecords;
      this.columns=data.columns;
      this.formDesigns=data.formDesigns;
      this.setNewRecordMap();
      // this.columns=data.columns.map(column=>this.getColumnObject(column));

    },error=>{
      
    });
  }
  setNewRecordMap(){
    this.columns.forEach(column=>{
      var record=new VirtualTableRecords();
      record.virtualTableFields=column;
      this.newRecordMap.set(column.fieldName,record);
    });
  }
  getColumnObject(item) {
    return {"prop":item};
  }
  addRecord(){
    this.form=new FormMaster();
    this.form.formDesignList=this.formDesigns;
    this.form.virtualTableMaster=this.selectedVirtualTable;
    this.virtualTableService.createNewRowDataFromForm(this.form).subscribe(data=>{
      this.getVirtualTableRecords(this.selectedVirtualTable.id);
    },error=>{

    });
  }
  getRowRecordForServer(){
    var recordList=[];
    this.newRecordMap.forEach((value:VirtualTableRecords)=>{
      recordList.push(value);
    });
    return recordList;
  }
  delete(row:VirtualRowRecordsDto){
    console.log(row[this.columns[0].fieldName]);
  
    this.virtualTableService.deleteDataRecordsByTableAndPkValue(this.selectedVirtualTable.id, row.pkValue).subscribe(data=>{
      this.getVirtualTableRecords(this.selectedVirtualTable.id);
    });
  }
}
