import { Component,EventEmitter, OnInit,Input,Output } from '@angular/core';
import {FormDesign} from '../../../../model/form-design.model';
import {FormComponentEnum} from '../../../../model/form-component.enum';
import {VirtualTableFields} from '../../../../model/virtual-table-fields.model';
import { FormComponentRefValue } from '../../../../model/form-component-ref-value.model';
import { VirtualTableConstraints } from '../../../../model/virtual-table-constraints.model';
import { VirtualTableConstraintType } from '../../../../model/virtual-table-constraints-type.model';

@Component({
  selector: 'app-component-properties-dir',
  templateUrl: './component-properties-dir.component.html'
})
export class ComponentPropertiesDirComponent implements OnInit {
  @Input() formDesign: FormDesign;
  @Input() virtualTableFieldsList: VirtualTableFields[]=[];
  @Input() refTableMap:any;
  componentTypeList:String[]=[];
  _virtualFieldId:number;
  selectComponent:FormComponentEnum=FormComponentEnum.COMPO;
  radioComponent:FormComponentEnum=FormComponentEnum.RADIO;
  // foreignConstraint:VirtualTableConstraints;
  constructor() { }

  ngOnInit() {
    if(this.formDesign==null){
      this.formDesign=new FormDesign();
      this.formDesign.virtualTableField=new VirtualTableFields();
    }
    this._virtualFieldId=this.formDesign.virtualTableField?this.formDesign.virtualTableField.id:0;
    // this.foreignConstraint=this.formDesign.virtualTableField.fieldConstraintList
    // && this.formDesign.virtualTableField.fieldConstraintList.find(contraint=>contraint.constraintType==VirtualTableConstraintType.FOREIGN_KEY);
    this.componentTypeList=Object.values(FormComponentEnum);
   

  }
  onChange(field:VirtualTableFields){
    // const field=this.virtualTableFieldsList.find(x=>x.id==id);
    // const fieldString=JSON.stringify(field)
    this.formDesign.virtualTableField=field; 
    this.formDesign.componentName=field.fieldName; 
    this.formDesign.componentLabel=field.fieldName; 
    if(this.refTableMap.has(this.formDesign.virtualTableField.fieldName) && !this.formDesign.componentRefValues){
      this.formDesign.componentRefValues=[];
      this.formDesign.componentRefValues.push(new FormComponentRefValue());
      this.formDesign.componentType=FormComponentEnum.COMPO; 
    }
    else{
      this.formDesign.componentRefValues=[];
    }
  }
  OnAddRefValue(refValues:FormComponentRefValue[]){
    refValues.push(new FormComponentRefValue());
  }
  OnRemoveRefValue(refValues:FormComponentRefValue[],refValue:FormComponentRefValue){
    const index = refValues.indexOf(refValue, 0);
    if (index > -1) {
      refValues.splice(index, 1);
    }
  }
  
}
