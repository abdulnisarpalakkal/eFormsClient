import { WorkflowNodeType } from "./workflow-node-type.enum";
import { FormMaster } from "./form-master.model";
import { WorkflowMaster } from "./workflow-master.model";
import { WorkflowLink } from "./workflow-link.model";
import { ActionEventObject } from "./action-event-object.model";
import { Node, NodePosition, NodeDimension } from '@swimlane/ngx-graph';

export class WorkflowNode implements Node  {
      public id: string;
      public position?: NodePosition;
      public dimension?:NodeDimension;
      public transform?: string;
      public label?: string;
      public data?: any;
      public meta?: any;
        public  nodeId: number;
      //   public  id: String;
        public nodeLinkId: String;
        public nodeType: WorkflowNodeType;

      //   public label: String;
        public formMaster: FormMaster;
        public childWorkflow:WorkflowMaster;
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