import { Component,EventEmitter, OnInit,Input,Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import {FormDesign} from '../../../model/form-design.model';
import { FormMaster } from '../../../model/form-master.model';
import { FormComponentEnum } from '../../../model/form-component.enum';
import { UserMsg } from '../../../model/user-msg.model';
import { Operator } from '../../../model/operator.enum';
import { FormRulesDirComponent } from '../../form/directives/form-rules-dir/form-rules-dir.component';
import { FormRuleParameterValue } from '../../../model/form-rule-parameter-value';
import { FormComponentRefValue } from '../../../model/form-component-ref-value.model';


@Component({
  selector: 'app-workflow-form-view',
  templateUrl: './workflow-form-view.component.html',
  styleUrls: ['./workflow-form-view.component.scss']
})
export class WorkflowFormViewComponent implements OnInit {
  @Input() form: FormMaster;
  @Input() formDesignList: FormDesign[]=[];
  selectComponent:FormComponentEnum=FormComponentEnum.COMPO;
  labelComponent:FormComponentEnum=FormComponentEnum.LABEL;
  radioComponent:FormComponentEnum=FormComponentEnum.RADIO;
  checkComponent:FormComponentEnum=FormComponentEnum.CHECKBOX;;
  dateComponent:FormComponentEnum=FormComponentEnum.DATE;

  rules:any = [
    [{ // AND conditions:
        "field": "active",
        "compare": "eq",
        "target": 1
    }, {
        "field": "span",
        "compare": "gt",
        "target": 5
    }], // Next array will be OR'ed
    [{
        "field": "name",
        "compare": "less",
        "target": "'literal'"
    }]
];


  constructor() { }

  ngOnInit() {
    
    this.formDesignList=this.formDesignList.sort((design1,design2):number=>{
      return design1.alignOrder<design2.alignOrder?-1:1;
    });
  }
  conditionSplit(op:Operator,conditionString:string){
  
    return conditionString.split(op);
   
  }
  validateRule(formDesign:FormDesign){
   
    if(formDesign.formRules==null || formDesign.formRules.length==0)
      return true;
    var isValid=true;
    formDesign.formRules.forEach(rule=>{
      if(rule.formRuleType.ruleTypeName=='SHOW'){
        var conditionalString=this.getParameterValue(rule.formRuleParameterValues)
       if(conditionalString)
          isValid=isValid && this.validateCondition(Operator.OR,conditionalString.toUpperCase())

      }
    });
   
    return isValid;
  }
  validateCondition(op:Operator,conditionString:string):boolean{
    var returnValue:boolean=false;
    
    switch(op){
      case Operator.OR:
        if(conditionString.indexOf(Operator.OR)!=-1){
          var OR_Split:string[]=this.conditionSplit(Operator.OR,conditionString);
          returnValue=false;
          OR_Split.forEach(or_conditon=>{
            returnValue=returnValue || this.validateCondition(Operator.AND,or_conditon);
          });
        }
        else{
          returnValue =this.validateCondition(Operator.AND,conditionString);
        }
        break;
      case Operator.AND:
        if(conditionString.indexOf(Operator.AND)!=-1){
           
            var AND_Split:string[]=this.conditionSplit(Operator.AND,conditionString);
            returnValue=true;
            AND_Split.forEach(and_conditon=>{
              returnValue=returnValue && this.validateCondition(Operator.GE,and_conditon);
            });
        }
        else{
          returnValue=this.validateCondition(Operator.GE,conditionString);
        }
        
        break;
      case Operator.GE:
        if(conditionString.indexOf(Operator.GE)!=-1){
          var GE_Split:string[]=this.conditionSplit(Operator.GE,conditionString);
          returnValue=this.getVariableValueFromOperand(GE_Split[0]) >= this.getVariableValueFromOperand(GE_Split[1]);
        }
        else{
          returnValue=this.validateCondition(Operator.LE,conditionString);
        }
        break;
      case Operator.LE:
        if(conditionString.indexOf(Operator.LE)!=-1){
          var LE_Split:string[]=this.conditionSplit(Operator.LE,conditionString);
          // console.log(this.getVariableValueFromOperand(EQ_Split[0])+"=="+this.getVariableValueFromOperand(EQ_Split[1]));
          returnValue=this.getVariableValueFromOperand(LE_Split[0]) <= this.getVariableValueFromOperand(LE_Split[1]);
        }
        else{
          returnValue=this.validateCondition(Operator.EQ,conditionString);
        }
        break;
      case Operator.EQ:
        if(conditionString.indexOf(Operator.EQ)!=-1){
          var EQ_Split:string[]=this.conditionSplit(Operator.EQ,conditionString);
          console.log(this.getVariableValueFromOperand(EQ_Split[0])+"=="+this.getVariableValueFromOperand(EQ_Split[1]));
          returnValue=this.getVariableValueFromOperand(EQ_Split[0]) == this.getVariableValueFromOperand(EQ_Split[1]);
        }
        else{
          returnValue=this.validateCondition(Operator.GT,conditionString);
        }
        break;
      case Operator.GT:
        if(conditionString.indexOf(Operator.GT)!=-1){
          var GT_Split:string[]=this.conditionSplit(Operator.GT,conditionString);
          // console.log(this.getVariableValueFromOperand(EQ_Split[0])+"=="+this.getVariableValueFromOperand(EQ_Split[1]));
          returnValue=this.getVariableValueFromOperand(GT_Split[0]) > this.getVariableValueFromOperand(GT_Split[1]);
        }
        else{
          returnValue=this.validateCondition(Operator.LT,conditionString);
        }
        break;
      case Operator.LT:
        if(conditionString.indexOf(Operator.LT)!=-1){
          var LT_Split:string[]=this.conditionSplit(Operator.LT,conditionString);
          // console.log(this.getVariableValueFromOperand(EQ_Split[0])+"=="+this.getVariableValueFromOperand(EQ_Split[1]));
          returnValue=this.getVariableValueFromOperand(LT_Split[0]) < this.getVariableValueFromOperand(LT_Split[1]);
        }
        else{
          returnValue=false;
        }
        break;
    }
    // console.log(returnValue);
    return returnValue;
  }
  getVariableValueFromOperand(operand:string){
    operand=operand.trim();
    if(operand.indexOf('{')==0 && operand.indexOf('}')==operand.length-1){ //get component name if string is enclosed b/w {}
      return this.getFieldValueFromVaraibale(operand.substring(1,operand.length-1));
    }
    else
      return operand;

  }
  getFieldValueFromVaraibale(variable:string){
    
    var formDesign:FormDesign=this.formDesignList.find(design=>{ //find the reference form component
      const name:string=design.componentName.toUpperCase();
      if(name==variable)
        return true;
    });

    var refFieldValue=null;
    if(formDesign){
      refFieldValue=formDesign.componentValue?formDesign.componentValue.trim().toUpperCase():null; // get reference value form reference form component
      if(refFieldValue!=null && formDesign.componentType==FormComponentEnum.COMPO){
        var formComponentRefValue:FormComponentRefValue=formDesign.componentRefValues.find(refValue=>{ //find the corresponding record from collection if component type is compo
          if(refValue.refKey.toUpperCase()==refFieldValue) 
            return true;
        });
        refFieldValue=formComponentRefValue?formComponentRefValue.refValue.toUpperCase():null;
      }
    }
    return refFieldValue;
  }
  getParameterValue(parameterValues:FormRuleParameterValue[]){
    return parameterValues[0].formRuleParameterValue;
  }
}
