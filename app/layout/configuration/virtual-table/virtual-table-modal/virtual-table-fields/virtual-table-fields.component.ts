import { Component, OnInit, Input, Output } from '@angular/core';
import { VirtualTableFields } from '../../../../../model/virtual-table-fields.model';
import { VirtualTableConstraints } from '../../../../../model/virtual-table-constraints.model';
import { VirtualTableFieldsConstraintDto } from '../../../../../model/Virtual-table-fields-constraint-dto.model';
import { VirtualTableConstraintType } from '../../../../../model/virtual-table-constraints-type.model';

@Component({
  selector: 'app-virtual-table-fields',
  templateUrl: './virtual-table-fields.component.html'
})
export class VirtualTableFieldsComponent implements OnInit {

  @Input() virtualTableFieldsConstraintDto:VirtualTableFieldsConstraintDto;
  @Input() dataTypes:string[]=[];
  @Input() isNew:boolean;
  // @Input() pkConstraint:VirtualTableConstraints;
  // @Output() pk
  pkConstraint:VirtualTableConstraints;

  constructor() { }

  ngOnInit() {
    this.pkConstraint=this.virtualTableFieldsConstraintDto.pkConstraint;
   
    
  }
  toggleRemoveField(virtualTableField:VirtualTableFields){
    // const index = this.virtualTableFieldsList.indexOf(virtualTableField, 0);
    // if (index > -1) {
    //   this.virtualTableFieldsList.splice(index, 1);
    // }
    virtualTableField.deleted=!virtualTableField.deleted;
  }
  OnPkChecked(virtualTableField:VirtualTableFields)
  {
    
    this.virtualTableFieldsConstraintDto.pkConstraint.virtualTableField=virtualTableField;
    
  }
  
  handleChange(evt,virtualTableField:VirtualTableFields) {
    
    // console.log(this.pkConstraint.virtualTableField.fieldName!=null && this.pkConstraint.virtualTableField.fieldName==virtualTableField.fieldName);
    var target = evt.target;
    if(target.checked){
      if(virtualTableField.fieldName==null)
      {
        target.checked=false;
        return;
      }
      this.OnPkChecked(virtualTableField);
    }
    // this.virtualTableFieldsList=[...this.virtualTableFieldsList];
   
  }
  addField(){

    this.virtualTableFieldsConstraintDto.virtualTableFields[this.virtualTableFieldsConstraintDto.virtualTableFields.length]=new VirtualTableFields();
    // this.virtualTableFieldsList[this.virtualTableFieldsList.length-1].virtualTableMaster=this.virtualTable;
  } 
}
