import { Component, OnInit, Input } from '@angular/core';
import { VirtualTableFields } from '../../../../../model/virtual-table-fields.model';
import { VirtualTableConstraints } from '../../../../../model/virtual-table-constraints.model';
import { VirtualTable } from '../../../../../model/virtual-table.model';
import { VirtualTableConstraintType } from '../../../../../model/virtual-table-constraints-type.model';
import { VirtualTableFieldsConstraintDto } from '../../../../../model/Virtual-table-fields-constraint-dto.model';

@Component({
  selector: 'app-virtual-table-constraints',
  templateUrl: './virtual-table-constraints.component.html'
})
export class VirtualTableConstraintsComponent implements OnInit {
  @Input() virtualTableFieldsConstraintDto:VirtualTableFieldsConstraintDto;
  
  @Input() refVirtualTables:VirtualTable[];
  @Input() refVirtualTableConstraints:VirtualTableConstraints[];
  foreignKeyConstraints:VirtualTableConstraints[];
  pkeyRefConstraints:VirtualTableConstraints[];
  


  constructor() { }

  ngOnInit() {
    this.foreignKeyConstraints=this.virtualTableFieldsConstraintDto.fkConstraints;
    this.pkeyRefConstraints=this.refVirtualTableConstraints.filter(c=>c.constraintType==VirtualTableConstraintType.PRIMARY_KEY);
  }
  addForeignKey(){
    const virtualTableConstraints:VirtualTableConstraints=new VirtualTableConstraints();
    virtualTableConstraints.virtualTableField=new VirtualTableFields();
    virtualTableConstraints.foreignConstraint=new VirtualTableConstraints();
    virtualTableConstraints.foreignConstraint.virtualTableField=new VirtualTableFields();
    virtualTableConstraints.foreignConstraint.virtualTableField.virtualTableMaster=new VirtualTable();
    virtualTableConstraints.constraintType=VirtualTableConstraintType.FOREIGN_KEY;
    this.foreignKeyConstraints[this.foreignKeyConstraints.length]=virtualTableConstraints;
  }
  removeForeignKey(fkConstraint:VirtualTableConstraints){
    fkConstraint.deleted=!fkConstraint.deleted;
    // const index = this.foreignKeyConstraints.indexOf(fkConstraint, 0);
    // if (index > -1) {
    //   this.foreignKeyConstraints.splice(index, 1);
    // }
  }
  updateFieldName(constraint:VirtualTableConstraints,field:string): void{
    constraint.virtualTableField = this.virtualTableFieldsConstraintDto.virtualTableFields.find(f=>f.fieldName==field);
    
  }
  updateRefConstraintField(constraint:VirtualTableConstraints,refConstraintField:string): void{
    constraint.foreignConstraint 
    =JSON.parse(JSON.stringify( this.pkeyRefConstraints.find(f=>f.virtualTableField.fieldName==refConstraintField 
      && f.virtualTableField.virtualTableMaster.tableName==constraint.foreignConstraint.virtualTableField.virtualTableMaster.tableName ) ));
    
  }
  onTableChanged(constraint:VirtualTableConstraints,tableName:string): void{
    constraint.foreignConstraint.virtualTableField.fieldName="";
    
  }
}
