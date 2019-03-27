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
// actionEventParamList:ActionEvent[]=[];
workflowFormsList:FormMaster[]=[];
processList:Process[]=[];
users:User[];
userGroups:UserRoles[];
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

@ViewChild(DatatableComponent) table: DatatableComponent;

//#endregion
  constructor(private workflowActionService: WorkflowActionService,private workflowService: WorkflowService,private processService:ProcessService,private formService:FormService,private administrationService:AdministrationService,private modalService: NgbModal, private handler:Handler) { }

  ngOnInit() {
    if(this.processId)
      this.getAllWorkflowByProcess(this.processId);
    else
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

//#region handlers


convertGraphNodesToWorkflowNodes(graphNodes:WorkflowNode[]){
  if(graphNodes==null || graphNodes.length==0)
    return;
  // const workflowMaster=this.modalWorkflow;
  
  graphNodes.forEach(node => {
  //  node.nodeId=0;
  //  node.actionEventObjects.forEach(eventObject=>{
  //    eventObject.id=0;
  //    eventObject.actionEventParamObjects.forEach(eventParamObject=>eventParamObject.id=0);
  //  }

  //  );
  //  workflowNode.nodeLinkId=node.id;
  //  workflowNode.nodeType=node.nodeType;
  //  workflowNode.label=node.label;

  //  workflowNode.formMaster=node.formMaster;
  //  workflowNode.workflowAction=node.workflowAction;
  //  workflowNode.workflowMaster=workflowMaster;
  //  this.workflowNodeList.push(workflowNode);

  });
}
convertGraphLinksToWorkflowLinks(graphLinks:WorkflowLink[]){
  if(graphLinks==null || graphLinks.length==0)
    return;
  // const workflowMaster=this.modalWorkflow;
  // this.workflowLinkList=[];
  graphLinks.forEach(link => {
    // const workflowLink=new WorkflowLink();
    // workflowLink.label=link.label;
    link.sourceNode=this.workflowNodeList.find(x=>x.id==link.source);
    link.targetNode=this.workflowNodeList.find(x=>x.id==link.target);
    // workflowLink.workflowMaster=workflowMaster;
    // this.workflowLinkList.push(workflowLink);
   });
}
convertWorkflowNodesToGraphNodes(workflowNodeList:WorkflowNode[]){
  if(workflowNodeList==null || workflowNodeList.length==0)
    return;
 
  workflowNodeList.forEach(workflowNode => {
    workflowNode.id=""+workflowNode.nodeId;
   
    switch(workflowNode.nodeType){
      case WorkflowNodeType.START:
      workflowNode.color="#9fef8f";
        break;
      case WorkflowNodeType.STOP:
      workflowNode.color="#ed0b0b";
        break;
      case WorkflowNodeType.FORM:
      workflowNode.color="#8fbaef";
        break;
      case WorkflowNodeType.ACTION:
      workflowNode.color="#ef8f8f";
        break;
      default:
      workflowNode.color="#D5D5C9";
        break;
    }


   });
  }
   convertWorkflowLinksTOGraphLinks(workflowLinks:WorkflowLink[]){
    
   
    workflowLinks.forEach(workflowLink => {
      
      workflowLink.source=""+workflowLink.sourceNode.nodeId;
      workflowLink.target=""+workflowLink.targetNode.nodeId;
      
     });
  }

//#endregion


//#region Modal window
//#region Modal 1
open(content,workflow:WorkflowMaster,isNew) {
  this.isNew=isNew;
  if(!isNew)
  {
    this.modalWorkflow=workflow;
  }
  else
    this.modalWorkflow=new WorkflowMaster();
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
  this.modalReference2=this.modalService.open(content,{ size: 'lg', backdrop:"static", windowClass:'modal-xl custom_modal_dialog custom_modal_content' });
  
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
  this.workflowService.getAllWorkflow()
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
public getAllWorkflowByProcess(processId:number) {
  this.workflowService.getAllWorkflowByProcess(processId)
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
public getWorkflowNodeList (workflowId) {
  this.workflowService.getAllWorkflowNodeByWorkflow(workflowId)
  .subscribe(
        data => {
          this.workflowNodeList=data; 
          this.convertWorkflowNodesToGraphNodes(this.workflowNodeList);
        },
        error=>{
        }
  );
}
public getWorkflowLinkList (workflowId) {
  this.workflowService.getAllWorkflowLinkByWorkflow(workflowId)
  .subscribe(
        data => {
          this.workflowLinkList=data;   
          this.convertWorkflowLinksTOGraphLinks(this.workflowLinkList);
        },
        error=>{
        }
  );
}
public getActionEventList() {
  this.workflowActionService.getAllEvent()
  .subscribe(
        data => {
          this.actionEventList=data;   
        },
        error=>{
        }
  );
}
// public getActionEventParamList() {
//   this.workflowActionService.getAllEventParam()
//   .subscribe(
//         data => {
//           this.success=true;
//           this.actionEventParamList=data;   
//         },
//         error=>{
//           this.errorHandler(error);
//         }
//   );
// }
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
public getWorkflowFormList(processId) {
  this.formService.getAllUnderProcess(processId)
  .subscribe(
        data => {
          this.workflowFormsList=data;   
        },
        error=>{
        }
  );
}
public getUserList() {
  this.administrationService.getUsers()
  .subscribe(
        data => {
          this.users=data;   
        },
        error=>{
        }
  );
}
public getUserRoleList() {
  this.administrationService.getUserRoles()
  .subscribe(
        data => {
          this.userGroups=data;   
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
createNodes(){
  this.workflowService.createWorkflowDesign(this.modalWorkflow)
    .subscribe(
        data => {
          // if(this.workflowLinkList.length>0)
          //   this.createLinks();
          this.closeDesignModal();
          this.getWorkflowsList();
        },
        error=>{
        }
    );
}
createLinks(){
  this.workflowService.createAllWorkflowLink(this.workflowLinkList)
  .subscribe(
      data => {
        this.closeModal();
        this.getWorkflowsList();
      },
      error=>{
      }
  );
}
onUpdatedDesign(nodes) {
  
  this.convertGraphNodesToWorkflowNodes(this.workflowNodeList);
  this.convertGraphLinksToWorkflowLinks(this.workflowLinkList);
  if(this.workflowNodeList.length!=0)
  {
    this.modalWorkflow.workflowNodeList=this.workflowNodeList;
    this.modalWorkflow.workflowLinkList=this.workflowLinkList;

    this.createNodes();
  }
  // if(this.workflowLinkList.length!=0)
  //   this.createLinks();
 
}
//#endregion
//#region event listeners
public designClick(content,workflow:WorkflowMaster){
  this.workflowNodeList=[];
  this.workflowLinkList=[];
  
  this.getWorkflowNodeList(workflow.id);
  this.getWorkflowLinkList(workflow.id);
  
  
  this.getWorkflowFormList(workflow.process.id);
  this.getActionEventList(); //parameters are saved inside this object
  this.getUserList();
  this.getUserRoleList();
  // this.getActionEventParamList();
  this.openDesignModal(content,workflow);
  
}
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
