import { FormRule } from "./form-rule";
import { FormRuleTypeParameter } from "./form-rule-type-parameter";

export class FormRuleParameterValue {
    public id:number;
    public formRule:FormRule;
    public formRuleTypeParameter:FormRuleTypeParameter;
    public formRuleParameterValue:string;
}
