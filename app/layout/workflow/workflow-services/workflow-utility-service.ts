import {  Injectable } from "@angular/core";
import { WorkflowNodeType } from "../../../model/workflow-node-type.enum";
import { WorkflowNode } from "../../../model/workflow-node.model";
import { FormMaster } from "../../../model/form-master.model";
import { WorkflowMaster } from "../../../model/workflow-master.model";

@Injectable()
export class WorkflowUtilityService{

     
  generateNode(nodeType:WorkflowNodeType){
    var node=new WorkflowNode();
    node.nodeType=nodeType;
    
    switch(node.nodeType){
      case WorkflowNodeType.START:
        node.label="START";
        node.color="#9fef8f";
        break;
      case WorkflowNodeType.STOP:
        node.label="STOP";
        node.color="#ed0b0b";
        break;
      case WorkflowNodeType.FORM:
        node.label="Form";
        node.color="#8fbaef";
        node.formMaster=new FormMaster();
        break;
      case WorkflowNodeType.ACTION:
        node.label="Action";
        node.color="#ef8f8f";
        node.actionEventObjects=[];
        
        break;
      case WorkflowNodeType.CHILD_WORKFLOW:
        node.label="Workflow";
        node.color="#56f442";
        node.workflowMaster=new WorkflowMaster();
        
        break;
      default:
        node.color="#D5D5C9";
        break;
    }
    return node;
  }
}