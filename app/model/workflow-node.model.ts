import { WorkflowNodeType } from "./workflow-node-type.enum";
import { FormMaster } from "./form-master.model";
import { WorkflowMaster } from "./workflow-master.model";
import { WorkflowLink } from "./workflow-link.model";
import { ActionEventObject } from "./action-event-object.model";

export class WorkflowNode {
        public  nodeId: number;
        public  id: String;
        public nodeLinkId: String;
        public nodeType: WorkflowNodeType;

        public label: String;
        public formMaster: FormMaster;
        public color:String;

        public width:number;
        public height:number;
        public options:any;
        
        public x:number;
        public y:number;

        public actionEventObjects:ActionEventObject[]=[];
        public workflowMaster:WorkflowMaster;

        public sourceLinkList:WorkflowLink[];
        public destLinkList:WorkflowLink[];


    
  }