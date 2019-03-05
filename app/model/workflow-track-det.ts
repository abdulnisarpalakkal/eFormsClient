import { WorkflowTrackMaster } from "./workflow-track-master";
import { WorkflowNode } from "./workflow-node.model";

export class WorkflowTrackDet {
    public  id: number;
  
    public workflowTrackMaster: WorkflowTrackMaster;
    public workflowNode: WorkflowNode;
    public dataId: number;
    public open:boolean;


}