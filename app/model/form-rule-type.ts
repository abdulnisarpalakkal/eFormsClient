import { FormRuleTypeParameter } from "./form-rule-type-parameter";

export class FormRuleType {
    public id:number;
    public ruleTypeName:string;
    public ruleTypeDesc:string;
    public formRuleTypeParameterList:FormRuleTypeParameter[]=[];
}
