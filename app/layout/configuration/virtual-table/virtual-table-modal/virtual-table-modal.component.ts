import { Component,EventEmitter, OnInit,Input,Output } from '@angular/core';

import {VirtualTable} from '../../../../model/virtual-table.model';
import { NgForm } from '@angular/forms';
import { Process } from '../../../../model/process.model';
import { VirtualTableFields } from '../../../../model/virtual-table-fields.model';
import { VirtualTableConstraints } from '../../../../model/virtual-table-constraints.model';
import { VirtualTableConstraintType } from '../../../../model/virtual-table-constraints-type.model';
import {VirtualTableService} from './../../../../shared';
import { VirtualTableFieldsConstraintDto } from '../../../../model/Virtual-table-fields-constraint-dto.model';
import { UserMsg } from '../../../../model/user-msg.model';


@Component({
  selector: 'app-virtual-table-modal',
  templateUrl: './virtual-table-modal.component.html'
})
export class VirtualTableModalComponent implements OnInit {
  
  @Input() virtualTableFieldsConstraintDto:VirtualTableFieldsConstraintDto;
  @Input() isNew:boolean; 
  @Input() processList:Process[]=[]; 
  @Input() dataTypes:string[]=[]; 
  _processId:number;
  _pkIndex:number;

  // pkConstraint:VirtualTableConstraints;
  foreignKeyConstraints:VirtualTableConstraints[];
  refVirtualTables:VirtualTable[];
  
  refVirtualTableConstraints:VirtualTableConstraints[];


  constructor(private virtualTableService: VirtualTableService) { }

  
  ngOnInit() {
    this._processId=this.virtualTableFieldsConstraintDto.virtualTable.process?this.virtualTableFieldsConstraintDto.virtualTable.process.id:0;
    if(!this.isNew)
    {
      this.getFieldsByTableId(this.virtualTableFieldsConstraintDto.virtualTable.id);
      this.getConstraintsByTableId(this.virtualTableFieldsConstraintDto.virtualTable.id);
      this.getConstraintRefDataByProcessId(this._processId);
    }
    else{
      this.virtualTableFieldsConstraintDto.pkConstraint=new VirtualTableConstraints();
      this.virtualTableFieldsConstraintDto.pkConstraint.constraintType=VirtualTableConstraintType.PRIMARY_KEY;
      this.virtualTableFieldsConstraintDto.pkConstraint.virtualTableField=new VirtualTableFields();
    }
    // this.virtualTableFieldsList=this.virtualTable.virtualTableFieldsList;
   
    
    

  }
//#region Service calls
  public getFieldsByTableId(tableId) {
    this.virtualTableService.getTableFieldsByTable(tableId)
    .subscribe(
          data => {
            this.virtualTableFieldsConstraintDto.virtualTableFields=data;   
            if(this.virtualTableFieldsConstraintDto.virtualTableFields==null)
              this.virtualTableFieldsConstraintDto.virtualTableFields=[];
          },
          error=>{
           
     
          }
    );
  }
  public getConstraintsByTableId(tableId) {
    this.virtualTableService.getTableConstraintsByTable(tableId)
    .subscribe(
          data => {
            const constraints:VirtualTableConstraints[]=data;  
            if(constraints!=null){
              this.virtualTableFieldsConstraintDto.pkConstraint=constraints.find(x=>x.constraintType==VirtualTableConstraintType.PRIMARY_KEY);
              this.virtualTableFieldsConstraintDto.fkConstraints=constraints.filter(x=>x.constraintType==VirtualTableConstraintType.FOREIGN_KEY);
            }
            if(this.virtualTableFieldsConstraintDto.pkConstraint==null) {
              this.virtualTableFieldsConstraintDto.pkConstraint=new VirtualTableConstraints();
              this.virtualTableFieldsConstraintDto.pkConstraint.constraintType=VirtualTableConstraintType.PRIMARY_KEY;
              this.virtualTableFieldsConstraintDto.pkConstraint.virtualTableField=new VirtualTableFields();
            } 
          },
          error=>{
           
          }
    );
  }

  public getConstraintRefDataByProcessId(processId) {
    this.virtualTableService.getConstraintRefDataByProcessId(processId)
    .subscribe(
          data => {
            this.refVirtualTables=data.refTables;  
            this.refVirtualTableConstraints=data.refPkConstraints;
          },
          error=>{
           
          }
    );
  }
  //#endregion
  onUpdate(virtualTableForm:NgForm) {
    this.virtualTableFieldsConstraintDto.virtualTable.process= this.processList.find(x=>x.id == this._processId);
    
  }
  OnChangeProcess(event){
    this.virtualTableFieldsConstraintDto.virtualTable.process= this.processList.find(x=>x.id == event.target.value);
  }
 
 
}
