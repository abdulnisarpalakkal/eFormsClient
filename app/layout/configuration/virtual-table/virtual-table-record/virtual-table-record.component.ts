import { Component, OnInit, Input } from '@angular/core';
import { VirtualTableService } from '../../../../shared';

@Component({
  selector: 'app-virtual-table-record',
  templateUrl: './virtual-table-record.component.html',
  styleUrls: ['./virtual-table-record.component.scss']
})
export class VirtualTableRecordComponent implements OnInit {
  @Input() tableId:number;
  rows:any=[]
  columns:any = [];
  constructor(private virtualTableService:VirtualTableService) { }

  ngOnInit() {
    this.getVirtualTableRecords(this.tableId);
  }
  public getVirtualTableRecords(tableId:number){
    this.virtualTableService.getDataRecordsByTable(tableId).subscribe(data=>{
      this.rows=data.records;
      this.columns=data.columns.map(column=>this.getColumnObject(column));

    },error=>{

    });
  }
  getColumnObject(item) {
    return {"prop":item};
  }
}
