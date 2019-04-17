import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormRule } from '../../../../model/form-rule';
import { FormRuleType } from '../../../../model/form-rule-type';
import { FormRuleParameterValue } from '../../../../model/form-rule-parameter-value';

@Component({
  selector: 'app-form-rules-dir',
  templateUrl: './form-rules-dir.component.html',
  styleUrls: ['./form-rules-dir.component.scss']
})
export class FormRulesDirComponent implements OnInit {
  
  @Input() formRules:FormRule[]=[];
  @Input() formRuleTypes:FormRuleType[]=[];
  formRule:FormRule;
  _ruleTypeId:number;
  // isNew:boolean;
  // showForm:boolean=false;
  
  constructor() { }

  ngOnInit() {
    // if(this.formRule!=null)
    //   this.showForm=true;
  }
  editRule(formRule:FormRule){
    // this.isNew=false;
    // this.showForm=true;
    this.formRule=formRule;
    this._ruleTypeId=this.formRule.formRuleType?this.formRule.formRuleType.id:-1;
  }
  addNewRule(){
    this.formRule=new FormRule();
    this.formRules.push(this.formRule);
    this._ruleTypeId=-1;
    // this.isNew=true;
    // this.showForm=true;
  }
  onChange(id){
    const formRuleType=this.formRuleTypes.find(type=>type.id=id);
    this.formRule.formRuleType=formRuleType;
    this.formRule.formRuleParameterValues=[];
    formRuleType.formRuleTypeParameterList.forEach(parameter => {
      var formRuleParameterValue=new FormRuleParameterValue();
      formRuleParameterValue.formRuleTypeParameter=parameter;
      this.formRule.formRuleParameterValues.push(formRuleParameterValue);
    });
  }
  saveRule(){
    // this.showForm=false;
    // if(this.isNew){
    //   this.formRules.push(this.formRule);
    // }
  }
  clearRule(){
    this.formRule=new FormRule();
  }
  deleteRule(formRule:FormRule){
    const index = this.formRules.indexOf(formRule, 0);
    if (index > -1) {
      this.formRules.splice(index, 1);
    }
  }
}
