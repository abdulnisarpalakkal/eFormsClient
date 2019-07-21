import { Component,EventEmitter, OnInit,Input,Output } from '@angular/core';
import {FormDesign} from '../../../../model/form-design.model';
import {FormComponentEnum} from '../../../../model/form-component.enum';
import {VirtualTableFields} from '../../../../model/virtual-table-fields.model';
import { FormComponentRefValue } from '../../../../model/form-component-ref-value.model';
import { VirtualTableConstraints } from '../../../../model/virtual-table-constraints.model';
import { VirtualTableConstraintType } from '../../../../model/virtual-table-constraints-type.model';
import { FormRule } from '../../../../model/form-rule';

@Component({
  selector: 'app-component-properties-dir',
  templateUrl: './component-properties-dir.component.html'
})
export class ComponentPropertiesDirComponent implements OnInit {
  @Input() formDesign: FormDesign;
  @Input() virtualTableFieldsList: VirtualTableFields[]=[];
  @Input() refTableMap:any;
  @Input() formRules:FormRule[]=[];
  componentTypeList:String[]=[];
  _virtualFieldId:number;
  selectComponent:FormComponentEnum=FormComponentEnum.COMPO;
  radioComponent:FormComponentEnum=FormComponentEnum.RADIO;
  showRulesCompo:boolean;
  // foreignConstraint:VirtualTableConstraints;
  constructor() { }

  ngOnInit() {
    if(this.formDesign==null){
      this.formDesign=new FormDesign();
      this.formDesign.formComponent.virtualTableField=new VirtualTableFields();
    }
    this._virtualFieldId=this.formDesign.formComponent.virtualTableField?this.formDesign.formComponent.virtualTableField.id:0;
    // this.foreignConstraint=this.formDesign.virtualTableField.fieldConstraintList
    // && this.formDesign.virtualTableField.fieldConstraintList.find(contraint=>contraint.constraintType==VirtualTableConstraintType.FOREIGN_KEY);
    this.componentTypeList=Object.values(FormComponentEnum);
   

  }
  onChange(field:VirtualTableFields){
    // const field=this.virtualTableFieldsList.find(x=>x.id==id);
    // const fieldString=JSON.stringify(field)
    this.formDesign.formComponent.virtualTableField=field; 
    this.formDesign.componentName=field.fieldName; 
    this.formDesign.formComponent.componentLabel=field.fieldName; 
    if(this.refTableMap.has(this.formDesign.formComponent.virtualTableField.fieldName) && !this.formDesign.formComponent.componentRefValues){
      this.formDesign.formComponent.componentRefValues=[];
      this.formDesign.formComponent.componentRefValues.push(new FormComponentRefValue());
      this.formDesign.componentType=FormComponentEnum.COMPO; 
    }
    else{
      this.formDesign.formComponent.componentRefValues=[];
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
  addNewRule(){
    this.showRulesCompo=true;
    
  }
  onChangeFormRule(formRule:FormRule){
    this.showRulesCompo=false;
    if(!this.formDesign.formRules)
      this.formDesign.formRules=[];
    this.formDesign.formRules.push(formRule);
    
  }
  removeFormRule(formRule:FormRule){
    const index = this.formDesign.formRules.indexOf(formRule, 0);
    if (index > -1) {
      this.formDesign.formRules.splice(index, 1);
    }
  }

}
