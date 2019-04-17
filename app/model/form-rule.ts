import { FormRuleParameterValue } from "./form-rule-parameter-value";
import { FormRuleType } from "./form-rule-type";

export class FormRule {
    public id:number;
    public formRuleName:string;
    public formRuleType:FormRuleType;
    public formRuleParameterValues:FormRuleParameterValue[]=[];

}
