import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { routerTransition } from '../../router.animations';
import {WorkflowService, Handler} from '../../shared';
import { WorkflowMaster } from '../../model/workflow-master.model';
import { WorkflowStage } from '../../model/workflow-stage.model';
import { FormMaster } from '../../model/form-master.model';
import { FormDesign } from '../../model/form-design.model';
import { WorkflowNode } from '../../model/workflow-node.model';
import { WorkflowTrackDet } from '../../model/workflow-track-det';
import { MsgInterface } from '../interface/msg-interface';
import { UserMsg } from '../../model/user-msg.model';

@Component({
  selector: 'app-workflow-dashboard',
  templateUrl: './workflow-dashboard.component.html',
  styleUrls: ['./workflow-dashboard.component.scss'],
  animations: [routerTransition()]
})
export class WorkflowDashboardComponent implements OnInit,MsgInterface {
  publishedWorkflows:WorkflowMaster[]=[]
  openWorkflowStages:WorkflowStage[]=[]
  constructor(public workflowService:WorkflowService,private modalService: NgbModal, private handler:Handler) { }
  workflowStage:WorkflowStage;
  closeResult: string;
  modalReference: any;
  form:FormMaster;  
  formDesignList:FormDesign[];
  msgOb:UserMsg=new UserMsg();

submitted = false;

  ngOnInit() {
    // this.getAllPublishedWorkflows();
    this.getAllOpenWorkflow();
  }
  //#region Service call
  getAllPublishedWorkflows(){
    this.workflowService.getAllPublishedWorkflow()
    .subscribe(data=>{
      this.publishedWorkflows=data;
    },error=>{
      this.errorHandler(error);
    });
  }
  getAllOpenWorkflow(){
    this.workflowService.getAllOpenWorkflow()
    .subscribe(data=>{
      this.openWorkflowStages=data;
    },error=>{
      this.errorHandler(error);
    });
  }
  getWorkflowStage(workflowStage:WorkflowStage,content){
    
    this.workflowService.runWorkflow(this.workflowStage)
    .subscribe(data=>{
          this.workflowStage=data;
          this.form=this.workflowStage.formNode.formMaster;
          this.formDesignList=this.form.formDesignList;
          this.open(content);
    },error=>{
      this.errorHandler(error);
    })
  }
 submitAction(actionNode:WorkflowNode){
  this.workflowStage.selectedActionNode=actionNode;
  this.workflowService.submitActionWorkflow(this.workflowStage)
  .subscribe(data=>{
      this.successHandler(actionNode.label+" submitted successfully");
      this.closeModal();
      this.getAllOpenWorkflow();
  },error=>{
      this.errorHandler(error);
  });
 }
  //#endregion
  
  //#region handlers
  successHandler(msg)
  {
     
      this.msgOb.msg=msg;
      this.msgOb=this.handler.getSuccessMsgObject(this.msgOb);
  }
  errorHandler(error)
  {
      this.msgOb.msg=error;
      this.msgOb=this.handler.getErrorMsgObject( this.msgOb);
      
  }
  //#endregion
//#region Modal 1
open(content) {
  this.msgOb.msg=null;
  this.submitted=false;
  this.modalReference=this.modalService.open(content,{ size: 'lg', backdrop:"static" });
  
  this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
closeModal() {
  this.modalReference.close();

}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return  `with: ${reason}`;
  }
}
//#endregion Modal1
//#region Event Listeners
OnWorkflowClick(workflow:WorkflowMaster,content){
  this.workflowStage=new WorkflowStage();
  this.workflowStage.workflowMaster=workflow;
  this.getWorkflowStage(this.workflowStage,content);
}
onActionClick(actionNode:WorkflowNode){
  this.submitAction(actionNode);
}
OnOpenWorkflowStageClick(stage:WorkflowStage,content){
  this.workflowStage=stage;
  this.getWorkflowStage(this.workflowStage,content);
}
//#region 

}
