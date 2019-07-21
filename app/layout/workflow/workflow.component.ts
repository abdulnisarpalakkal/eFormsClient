import { Component,ViewChild, OnInit,ViewEncapsulation, Input  } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';


import { routerTransition } from './../../router.animations';
import {WorkflowService,WorkflowActionService,ProcessService,FormService,Handler,AdministrationService} from '../../shared';
import {WorkflowMaster} from '../../model/workflow-master.model';
import { WorkflowNode } from '../../model/workflow-node.model';
import { WorkflowLink } from '../../model/workflow-link.model';
import { Process } from '../../model/process.model';
import { FormMaster } from '../../model/form-master.model';

import { ActionEvent } from '../../model/action-event.model';
import { WorkflowNodeType } from '../../model/workflow-node-type.enum';
import { User } from '../../model/user.model';
import { UserRoles } from '../../model/user-roles.model';
import { UserMsg } from '../../model/user-msg.model';
import { MsgInterface } from '../interface/msg-interface';
import { ProcessRoutingModule } from '../configuration/process/process-routing.module';
import { MDBModalRef, ModalDirective } from 'ng-uikit-pro-standard';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-workflow',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.scss'],
  animations: [routerTransition()]
})
export class WorkflowComponent implements OnInit {

  //#region  Variables
@Input() processId:number;
workflowList:WorkflowMaster[]=[];
workflowNodeList:WorkflowNode[]=[];
workflowLinkList:WorkflowLink[]=[];
actionEventList:ActionEvent[]=[];
workflowFormsList:FormMaster[]=[];
processList:Process[]=[];
users:User[];
userGroups:UserRoles[];
childWokflowList:WorkflowMaster[]=[];
// nodes: WorkflowNode[] = [];
// links: any[] = [];

temp = [];
modalWorkflow: WorkflowMaster;
public filter_Workflow: WorkflowMaster;

closeResult: string;
modalReference: any;
modalReference2: any;
closeResult2: string;
isNew :boolean=false;

@ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;
@ViewChild("workflowForm", {static: false}) public workflowForm: ModalDirective;

//#endregion
  constructor(private workflowService: WorkflowService,private processService:ProcessService,private formService:FormService
    ,private administrationService:AdministrationService,private modalService: NgbModal, private handler:Handler) { }

  ngOnInit() {
    this.getWorkflowsList();
    this.getProcessList();
    this.filter_Workflow=new WorkflowMaster();
  }
//#region Filters 
updateFilterEvent(event) {
  this.updateFilter();
}
updateFilter(){
  const workflowName =  this.filter_Workflow.workflowName?this.filter_Workflow.workflowName.toLowerCase():null;
 
  var valid=false;
  // filter our data
  const temp = this.temp.filter(function(d) {
      valid=  (!workflowName || (d.workflowName && (d.workflowName.toLowerCase()).indexOf(workflowName) !== -1))  ;
      return valid;
  });
  // update the rows
  this.workflowList = temp;
  // Whenever the filter changes, always go back to the first page
  this.table.offset = 0;
}
//#endregion



//#region Modal window
//#region Modal 1
open(content,workflow:WorkflowMaster,isNew) {
  this.isNew=isNew;
  if(!isNew) {
    this.modalWorkflow=workflow;
  }
  else{
    this.modalWorkflow=new WorkflowMaster();
    if(this.processId)
      this.modalWorkflow.process=this.processList.find(process=>process.id==this.processId);
  }
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
//#region Modal2
openDesignModal(content,workflow:WorkflowMaster) {
  this.modalWorkflow=workflow;
  this.modalReference2=this.modalService.open(content,{ size: 'lg', backdrop:"static", windowClass:'modal-full custom_modal_dialog custom_modal_content' });
  
  this.modalReference2.result.then((result) => {
      this.closeResult2 = `Closed with: ${result}`;
     
  }, (reason) => {
      this.closeResult2 = `Dismissed ${this.getDismissReasonDesignModal(reason)}`;
  });
}
closeDesignModal() {
  this.modalReference2.close();

}
private getDismissReasonDesignModal(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return  `with: ${reason}`;
  }
}
//#endregion Modal2
//#region Modal 1
openPreview(prevContent,designContent) {
  
  const modalReference=this.modalService.open(prevContent,{ size: 'lg', backdrop:"static" });
  this.modalReference2.close();
  modalReference.result.then((result) => {
    this.openDesignModal(designContent,this.modalWorkflow);
  }, (reason) => {
    this.openDesignModal(designContent,this.modalWorkflow);
  });
}


//#endregion Modal1

//#endregion


//#region Service calls
public getWorkflowsList() {
  const service=this.processId?
  this.workflowService.getAllWorkflowByProcess(this.processId):this.workflowService.getAllWorkflow();
  service
  .subscribe(
        data => {
          this.temp = [...data];
          this.workflowList=data;   
          this.updateFilter(); 
        },
        error=>{
         
        }
  );
}

public getProcessList() {
  this.processService.get()
  .subscribe(
        data => {
          this.processList=data;   
        },
        error=>{
        }
  );
}

delete(workflow:WorkflowMaster){
  if(!confirm("Are you sure to delete "+workflow.workflowName)) {
      return;
  }
  this.workflowService.deleteWorkflow(workflow)
  .subscribe(
      data => {
        this.getWorkflowsList();
      
      },
      error=>{
          this.getWorkflowsList();
      }
  );
}

onUpdated(workflow: WorkflowMaster) {
  if(this.isNew)
  {
    
    
    this.workflowService.createWorkflow(workflow)
    .subscribe(
        data => {
          this.closeModal();
          this.getWorkflowsList();
        },
        error=>{
        }
    );
  }
  else
  {
    this.workflowService.updateWorkflow(workflow)
    .subscribe(
        data => {
          this.closeModal();
          this.getWorkflowsList();
        },
        error=>{
        }
    );
  }


}
publishWorkflow(workflow: WorkflowMaster) {
      
  
    
    this.workflowService.publishWorkflow(workflow)
    .subscribe(
        data => {
          this.closeModal();
          this.getWorkflowsList();
        },
        error=>{
        }
    );
 }

//#endregion
//#region event listeners

onNodeUpdated(workflowNodeList) {
  this.workflowNodeList=workflowNodeList;
}
onLinkUpdated(workflowLinkList) {
  this.workflowLinkList=workflowLinkList;
}
onPublishClick(workflow:WorkflowMaster){
  workflow.published=true;
  this.publishWorkflow(workflow);
}
//#endregion event listeners
}
