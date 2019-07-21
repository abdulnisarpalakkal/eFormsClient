import { Component,EventEmitter, OnInit,Input,Output,ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal,NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as shape from 'd3-shape';
import { Subject } from 'rxjs';
import { WorkflowMaster } from '../../../model/workflow-master.model';
import { WorkflowNode } from '../../../model/workflow-node.model';
import { WorkflowLink } from '../../../model/workflow-link.model';
import { ActionEvent } from '../../../model/action-event.model';
import { WorkflowNodeType } from '../../../model/workflow-node-type.enum';
import { FormMaster } from '../../../model/form-master.model';
import { WorkflowLinkLabel } from '../../../model/workflow-link-label.enum';
import { ActionEventParam } from '../../../model/action-event-param.model';
import { User } from '../../../model/user.model';
import { UserRoles } from '../../../model/user-roles.model';
import { UserMsg } from '../../../model/user-msg.model';
import { ActivatedRoute } from '@angular/router';
import { WorkflowActionService, WorkflowService, FormService, AdministrationService } from '../../../shared';

@Component({
  selector: 'app-workflow-design',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: './workflow-design.component.html',
  styleUrls: ['./workflow-design.component.scss']
})
export class WorkflowDesignComponent implements OnInit {
  workflowId:number;

  workflow: WorkflowMaster;
  
  actionEventList: ActionEvent[]=[];
  users:User[];
  userGroups:UserRoles[];
  workflowFormsList: FormMaster[]=[];
  
  // nodeUpdated = new EventEmitter<any>();
  // linkUpdated = new EventEmitter<any>();
  
  nodes: WorkflowNode[]=[] ;
  links: WorkflowLink[] = [];
  childWokflowList:WorkflowMaster[]=[];
  workflowList:WorkflowMaster[]=[];
  // workflowNodeList:WorkflowNode[]=[];
  // workflowLinkList:WorkflowLink[]=[];



  curve: any = shape.curveLinear;
  view: any[];
  autoZoom: boolean = false;
  panOnZoom: boolean = true;
  enableZoom: boolean = false;
  autoCenter: boolean = false;
  showLegend: boolean = false;
  fitContainer: boolean = true;
  width: number = 850;
  height: number = 500;
  pages:boolean[]=[];

  nodeType:WorkflowNodeType;
  node:WorkflowNode;
  link:WorkflowLink;
  // workflowNode:WorkflowNode;
  // workflowLink:WorkflowLink;
  nodeSeq:number=0;
  nodeSelected:boolean=false;
  linkSelected:boolean=false;
  childWorkflowEnum:WorkflowNodeType=WorkflowNodeType.CHILD_WORKFLOW;
  // colorScheme: any = {
  //   domain: ['#E00804','#069625','#8e7319','#D5D5C9']
  // };
  colorScheme: any = {
    domain: ['#D5D5C9']
  };
  center$: Subject<any> = new Subject();
  
  @ViewChild("nodeContent", {static: false}) nodeContent: TemplateRef<any>;
  @ViewChild("linkContent", {static: false}) linkContent: TemplateRef<any>;


  
  constructor(private modalService: NgbModal,private route: ActivatedRoute,private workflowActionService: WorkflowActionService
    ,private workflowService: WorkflowService,private formService:FormService,private administrationService:AdministrationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      this.workflowId=+params.get("id");//+using to convert string to number
      if(this.workflowId){
        this.getWorkflowDataUsingId(this.workflowId);
      }
    });

    if (!this.fitContainer) {
      this.applyDimensions();
    }
    this.center$.next(true);
    
  }
  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }
  select(data) {
    console.log('Item clicked', data);
  }
  applyDimensions() {
    this.view = [this.width, this.height];
    // this.view = undefined
  }
  nodeClicked(selectedNode){
    this.nodeSelected=true;
    this.linkSelected=false;
    this.node=this.nodes.find(x=>x.id==selectedNode.id);
    this.node.formMaster=this.node.formMaster?this.workflowFormsList.find(x=>x.id==this.node.formMaster.id):null; //for getting same object
    this.node.childWorkflow=this.node.childWorkflow?this.childWokflowList.find(x=>x.id==this.node.childWorkflow.id):null; //for getting same object
   
    // this.node.actionEventObjects.push(this.node.actionEventObjects?this.actionEventList.find(x=>x.id==this.node.a.id):null);
  }
  linkClicked(selectedLink){
    this.nodeSelected=false;
    this.linkSelected=true;

    this.link=this.links.find(x=>x.source==selectedLink.source && x.target==selectedLink.target);//for getting same object
    
  }
  updateNodePropertiesClick(){
    
    this.nodes=[...this.nodes];
    // this.nodeUpdated.emit(this.nodes);
  }
  deleteNodeClick(){
    var index = this.nodes.indexOf(this.node,0);
    if (index > -1) {
      this.nodes.splice(index, 1);
    }
    index = this.links.findIndex(link=>link.source==this.node.id || link.target==this.node.id);
    while(index> -1){
      this.links.splice(index, 1);
      index = this.links.findIndex(link=>link.source==this.node.id || link.target==this.node.id);
    }

    this.nodes=[...this.nodes];
    this.links=[...this.links];
    // this.nodeUpdated.emit(this.nodes);
    // this.linkUpdated.emit(this.links);
  }
  
  updateLinkPropertiesClick(){
    // const source=this.link.source;
    // this.link.source=0;
    // this.links=[...this.links];
    // this.link.source=source;
    this.links=[...this.links];

    // this.linkUpdated.emit(this.links);
  }
  nodeDoubleClicked(){
    alert("double clicked");
  }
  nodeMoved(){
    // alert("clicked");
  }
  toggleExpandClass(index: number) {
    this.pages[index]=!this.pages[index];
   
  }
  
  generateNode(nodeType){
    this.node=new WorkflowNode();
    this.nodeType= (<any>WorkflowNodeType)[nodeType];
    this.node.nodeType=nodeType;
    
    switch(this.nodeType){
      case WorkflowNodeType.START:
        this.node.label="START";
        this.node.color="#9fef8f";
        break;
      case WorkflowNodeType.STOP:
        this.node.label="STOP";
        this.node.color="#ed0b0b";
        break;
      case WorkflowNodeType.FORM:
        this.node.label="Form";
        this.node.color="#8fbaef";
        this.node.formMaster=new FormMaster();
        break;
      case WorkflowNodeType.ACTION:
        this.node.label="Action";
        this.node.color="#ef8f8f";
        this.node.actionEventObjects=[];
        
        break;
      case WorkflowNodeType.CHILD_WORKFLOW:
        this.node.label="Workflow";
        this.node.color="#56f442";
        this.node.workflowMaster=new WorkflowMaster();
        
        break;
      default:
        this.node.color="#D5D5C9";
        break;
    }
  }
//#region Modal 
open(nodeType) {
  
  this.generateNode(nodeType);
  const modalReference=this.modalService.open(this.nodeContent,{ size: 'lg', backdrop:"static",scrollable:true });
  
  modalReference.result.then((result) => {

    this.node.id=""+this.nodeSeq++;
    this.nodes.push(this.node);
    this.nodes=[...this.nodes];
    // this.nodeUpdated.emit(this.nodes);
      
  }, (reason) => {
      
  });
}
generateLink(linkType){
  this.link=new WorkflowLink();
  this.link.label=(<any>WorkflowLinkLabel)[linkType];
  
}
openLinkPop(linkType) {
  
  this.generateLink(linkType);
  const modalReference=this.modalService.open(this.linkContent,{ size: 'sm', backdrop:"static" });
  
  modalReference.result.then((result) => {
    
  
      // source: this.workflowLink.sourceNode.nodeLinkId
      // ,target:this.workflowLink.targetNode.nodeLinkId
  
      this.links.push(this.link);
      this.links=[...this.links];
      // this.linkUpdated.emit(this.links);
      
  }, (reason) => {
      
  });
}
//#endregion Modal
public loadDesignData(){
  this.nodes=[];
  this.links=[];
  
  this.getWorkflowNodeList(this.workflow.id);
  this.getWorkflowLinkList(this.workflow.id);
  
  
  this.getWorkflowFormList(this.workflow.process.id);
  this.getActionEventList(); //parameters are saved inside this object
  this.getUserList();
  this.getUserRoleList();
  this.getPublishedChildWokflowList(this.workflow.process.id);
  
  
}
 //#region service call
private getWorkflowDataUsingId(workflowId:number){
  this.workflowService.getOneWorkflow(workflowId)
  .subscribe(
        data => {
          this.workflow=data; 
          this.loadDesignData();
        },
        error=>{
        }
  );
}  
public getWorkflowNodeList (workflowId) {
  this.workflowService.getAllWorkflowNodeByWorkflow(workflowId)
  .subscribe(
        data => {
          this.nodes=data; 
          this.convertWorkflowNodesToGraphNodes(this.nodes);
        },
        error=>{
        }
  );
}
public getWorkflowLinkList (workflowId) {
  this.workflowService.getAllWorkflowLinkByWorkflow(workflowId)
  .subscribe(
        data => {
          this.links=data;   
          this.convertWorkflowLinksTOGraphLinks(this.links);
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
public getPublishedChildWokflowList(processId) {
  const service=this.workflowService.getAllPublishedChildWorkflowsByProcess(processId);
  service
  .subscribe(
        data => {
          this.childWokflowList=data;   
        },
        error=>{
         
        }
  );
}
createNodes(){
  this.workflowService.createWorkflowDesign(this.workflow)
    .subscribe(
        data => {
         
        },
        error=>{
        }
    );
}

 //#endregion service call   
  
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
    link.sourceNode=this.nodes.find(x=>x.id==link.source);
    link.targetNode=this.nodes.find(x=>x.id==link.target);
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

  onUpdatedDesign(nodes) {
  
    this.convertGraphNodesToWorkflowNodes(this.nodes);
    this.convertGraphLinksToWorkflowLinks(this.links);
    if(this.nodes.length!=0)
    {
      this.workflow.workflowNodeList=this.nodes;
      this.workflow.workflowLinkList=this.links;
  
      this.createNodes();
    }
    
   
  }
//#endregion

}
