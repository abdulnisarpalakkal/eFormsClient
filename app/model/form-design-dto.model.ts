import { FormDesign } from "./form-design.model";
import { FormRule } from "./form-rule";
import { FormRuleType } from "./form-rule-type";

export class FormDesignDto {
    public formDesigns:FormDesign[]=[];
    public formRules:FormRule[];
    public formRuleTypes:FormRuleType[]=[];
}