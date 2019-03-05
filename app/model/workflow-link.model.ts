import { WorkflowNode } from "./workflow-node.model";
import { WorkflowLinkLabel } from "./workflow-link-label.enum";
import { WorkflowMaster } from "./workflow-master.model";

export class WorkflowLink {
        public  id: String;
        public  linkId: number;
      
        public label: WorkflowLinkLabel;
        public source:String;
        public target:String;

        public oldLine:any;
        public line:any;
        public points:any;

        public textTransform:any;
        public textAngle:any;
        public oldTextPath:any;

        public dominantBaseline:any;
        public textPath:any;

        public sourceNode: WorkflowNode;
        public targetNode:WorkflowNode;
        public workflowMaster:WorkflowMaster;
    
  }