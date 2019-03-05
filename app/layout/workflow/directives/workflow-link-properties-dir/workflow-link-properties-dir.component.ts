import { Component,EventEmitter, OnInit,Input,Output } from '@angular/core';
import { WorkflowNode } from '../../../../model/workflow-node.model';
import { WorkflowLink } from '../../../../model/workflow-link.model';
import { WorkflowLinkLabel } from '../../../../model/workflow-link-label.enum';

@Component({
  selector: 'app-workflow-link-properties-dir',
  templateUrl: './workflow-link-properties-dir.component.html'
})
export class WorkflowLinkPropertiesDirComponent implements OnInit {
  @Input() link: any;
  @Input() nodes: any[];
  linkLabels:String[];

  constructor() { }

  ngOnInit() {
    this.linkLabels=Object.values(WorkflowLinkLabel);
    if(this.link==null){
      this.link={};
      
    }
  
  }
  // onChangeSourceNode(sourceNode:WorkflowNode){
   
  //   this.link.sourceNode=sourceNode; 
  // }
  // onChangeTargetNode(targetNode:WorkflowNode){
   
  //   this.workflowLink.targetNode=targetNode; 
  // }

}
