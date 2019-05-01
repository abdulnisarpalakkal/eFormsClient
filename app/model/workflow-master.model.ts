import { Process } from "./process.model";
import { WorkflowLink } from "./workflow-link.model";
import { WorkflowNode } from "./workflow-node.model";

export class WorkflowMaster {
    public  id: number;
  
    public workflowName: string;
    public workflowDesc: string;
    public process: Process;
    public published:boolean;
    public workflowNodeList:WorkflowNode[];
    public workflowLinkList:WorkflowLink[];
    public child:boolean;

}