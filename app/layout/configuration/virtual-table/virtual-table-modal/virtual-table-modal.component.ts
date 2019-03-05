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
  @Output() errorHandler = new EventEmitter<any>();
  @Input() msgOb:UserMsg=new UserMsg();
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
           
     
            this.errorHandler.emit(error);
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
           
            this.errorHandler.emit(error);
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
           
            this.errorHandler.emit(error);
          }
    );
  }
  //#endregion
  onUpdate(virtualTableForm:NgForm) {
    this.virtualTableFieldsConstraintDto.virtualTable.process= this.processList.find(x=>x.id == this._processId);
    
    // this.virtualTableFieldsConstraintDto.virtualTableFields=this.virtualTableFieldsList;
    // var field=this.virtualTable.virtualTableFieldsList.find(x=>x.fieldName==this.pkConstraint.virtualTableField.fieldName);
    // if(this.virtualTable.virtualTableFieldsList!=null){
    //   this.virtualTable.virtualTableFieldsList.forEach(field=>{
    //     field.fieldConstraintList=[];

    //     if(this.pkConstraint!=null){    //adding primary key constraint
    //       if(this.pkConstraint.virtualTableField.fieldName==field.fieldName){
    //         this.pkConstraint.virtualTableField=null; //for avoiding circular reference
    //         field.fieldConstraintList.push(this.pkConstraint);
    //       }
    //     }

    //     if(this.foreignKeyConstraints!=null){ //adding foreign key constraint
    //       var fKey=this.foreignKeyConstraints.find(fk=>fk.virtualTableField.fieldName==field.fieldName);
    //       if(fKey!=null){
    //         fKey.virtualTableField=null;  //for avoiding circular reference
    //         field.fieldConstraintList.push(fKey);
    //       }

    //     }
    //   });
    // }

  

    // this.updated.emit(this.virtualTable);
  }
  OnChangeProcess(event){
    this.virtualTableFieldsConstraintDto.virtualTable.process= this.processList.find(x=>x.id == event.target.value);
  }
 
 
}