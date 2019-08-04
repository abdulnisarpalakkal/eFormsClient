import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { WorkflowNodeType } from '../../../model/workflow-node-type.enum';
import { Location } from '@angular/common';

@Component({
  selector: 'app-workflow-design-sidenav',
  templateUrl: './workflow-design-sidenav.component.html'
  // styleUrls: ['./workflow-design-sidenav.component.scss']
})
export class WorkflowDesignSidenavComponent implements OnInit {
  @Input() workflowName:string;
  @Output() openNodePopEmit=new EventEmitter();
  @Output() openLinkPopEmit=new EventEmitter();
  @Output() updateEmit=new EventEmitter();
  startNodeType:WorkflowNodeType=WorkflowNodeType.START;
  stopNodeType:WorkflowNodeType=WorkflowNodeType.STOP;
  formNodeType:WorkflowNodeType=WorkflowNodeType.FORM;
  actionNodeType:WorkflowNodeType=WorkflowNodeType.ACTION;
  childWorkflowNodeType:WorkflowNodeType=WorkflowNodeType.CHILD_WORKFLOW;

  constructor( private location: Location) { }

  ngOnInit() {
  }
  open(nodeType:WorkflowNodeType) {
    this.openNodePopEmit.emit(nodeType);
  }
  openLinkPop(linkType) {
    this.openLinkPopEmit.emit(linkType);
  }
  goBack(): void {
    this.location.back();
  }
  updateClick(){
    this.updateEmit.emit();
  }
}
