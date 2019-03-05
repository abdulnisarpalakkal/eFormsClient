import { WorkflowMaster } from "./workflow-master.model";
import { WorkflowTrackDet } from "./workflow-track-det";

export class WorkflowTrackMaster {
    public  id: number;
  
    public workflowMaster:WorkflowMaster;
    public workflowTrackDetList:WorkflowTrackDet[];

}