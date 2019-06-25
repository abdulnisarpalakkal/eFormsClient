import { WorkflowMaster } from "./workflow-master.model";
import { WorkflowTrackDet } from "./workflow-track-det";
import { User } from "./user.model";

export class WorkflowTrackMaster {
    public  id: number;
    public trackDate:Date;
    public requestedUser:User;
    public workflowMaster:WorkflowMaster;
    public workflowTrackDetList:WorkflowTrackDet[];
    public completed:boolean;

}