import { Component,EventEmitter, OnInit,Input,Output } from '@angular/core';
import {FormDesign} from '../../../../model/form-design.model';
import {FormComponentEnum} from '../../../../model/form-component.enum';
import {VirtualTableFields} from '../../../../model/virtual-table-fields.model';
import { FormComponentRefValue } from '../../../../model/form-component-ref-value.model';

@Component({
  selector: 'app-component-properties-dir',
  templateUrl: './component-properties-dir.component.html'
})
export class ComponentPropertiesDirComponent implements OnInit {
  @Input() formDesign: FormDesign;
  @Input() virtualTableFieldsList: VirtualTableFields[]=[];
  componentTypeList:String[]=[];
  _virtualFieldId:number;
  selectComponent:FormComponentEnum=FormComponentEnum.COMPO;
  radioComponent:FormComponentEnum=FormComponentEnum.RADIO;
  constructor() { }

  ngOnInit() {
    if(this.formDesign==null){
      this.formDesign=new FormDesign();
      this.formDesign.virtualTableField=new VirtualTableFields();
    }
    this._virtualFieldId=this.formDesign.virtualTableField?this.formDesign.virtualTableField.id:0;
    this.componentTypeList=Object.values(FormComponentEnum);
   

  }
  onChange(field:VirtualTableFields){
    // const field=this.virtualTableFieldsList.find(x=>x.id==id);
    // const fieldString=JSON.stringify(field)
    this.formDesign.virtualTableField=field; 
    this.formDesign.componentName=field.fieldName; 
    this.formDesign.componentLabel=field.fieldName; 
    this.formDesign.componentRefValues=[];
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
