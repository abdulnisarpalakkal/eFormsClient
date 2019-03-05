import { VirtualTableFields } from "./virtual-table-fields.model";
import { WorkflowMaster } from "./workflow-master.model";
import { WorkflowNode } from "./workflow-node.model";
import { WorkflowTrackDet } from "./workflow-track-det";

export class WorkflowStage {
    public id: number;
    public formNode:WorkflowNode;
    public actionNodes:WorkflowNode[];
    public workflowMaster: WorkflowMaster;
    public workflowTrackDet:WorkflowTrackDet;
    public selectedActionNode:WorkflowNode;


}