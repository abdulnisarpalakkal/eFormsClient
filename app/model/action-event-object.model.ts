import { ActionEvent } from "./action-event.model";
import { WorkflowNode } from "./workflow-node.model";
import { ActionEventParamObject } from "./action-event-param-object.model";

export class ActionEventObject {
    public  id: number;
  
    public actionEvent: ActionEvent;
    public workflowNode: WorkflowNode;
    public actionEventParamObjects:ActionEventParamObject[];

}