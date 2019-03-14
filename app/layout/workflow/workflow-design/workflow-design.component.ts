import { Component,EventEmitter, OnInit,Input,Output,ViewEncapsulation } from '@angular/core';
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

@Component({
  selector: 'app-workflow-design',
  // encapsulation: ViewEncapsulation.None,
  templateUrl: './workflow-design.component.html',
  styleUrls: ['./workflow-design.component.scss']
})
export class WorkflowDesignComponent implements OnInit {
  @Input() workflow: WorkflowMaster;
  
  @Input() actionEventList: ActionEvent[]=[];
  // @Input() actionEventParamList: ActionEventParam[]=[];
  @Input() users:User[];
  @Input() userGroups:UserRoles[];
  @Input() workflowFormsList: FormMaster[]=[];
  
  @Output() nodeUpdated = new EventEmitter<any>();
  @Output() linkUpdated = new EventEmitter<any>();
  
  @Input()  nodes: WorkflowNode[]=[] ;
  @Input() links: WorkflowLink[] = [];
  

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

  // colorScheme: any = {
  //   domain: ['#E00804','#069625','#8e7319','#D5D5C9']
  // };
  colorScheme: any = {
    domain: ['#D5D5C9']
  };
  center$: Subject<any> = new Subject();
  
  
  
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    if (!this.fitContainer) {
      this.applyDimensions();
    }
    this.center$.next(true);
    this.pages[0]=true;
    this.pages[1]=true;
    // const node={
    //   id:1,
    //   label:'test'
    // };
    // this.nodes.push(node);
    // this.nodes=[...this.nodes];
    
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
    
    // this.node.actionEventObjects.push(this.node.actionEventObjects?this.actionEventList.find(x=>x.id==this.node.a.id):null);
  }
  linkClicked(selectedLink){
    this.nodeSelected=false;
    this.linkSelected=true;

    this.link=this.links.find(x=>x.source==selectedLink.source && x.target==selectedLink.target);//for getting same object
    
  }
  updateNodePropertiesClick(){
    
    this.nodes=[...this.nodes];
    this.nodeUpdated.emit(this.nodes);
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
    this.nodeUpdated.emit(this.nodes);
    this.linkUpdated.emit(this.links);
  }
  
  updateLinkPropertiesClick(){
    // const source=this.link.source;
    // this.link.source=0;
    // this.links=[...this.links];
    // this.link.source=source;
    this.links=[...this.links];

    this.linkUpdated.emit(this.links);
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
      default:
        this.node.color="#D5D5C9";
        break;
    }
  }
//#region Modal 
open(content,nodeType) {
  
  this.generateNode(nodeType);
  const modalReference=this.modalService.open(content,{ size: 'lg', backdrop:"static" });
  
  modalReference.result.then((result) => {

    this.node.id=""+this.nodeSeq++;
    this.nodes.push(this.node);
    this.nodes=[...this.nodes];
    this.nodeUpdated.emit(this.nodes);
      
  }, (reason) => {
      
  });
}
generateLink(linkType){
  this.link=new WorkflowLink();
  this.link.label=(<any>WorkflowLinkLabel)[linkType];
  
}
openLinkPop(content,linkType) {
  
  this.generateLink(linkType);
  const modalReference=this.modalService.open(content,{ size: 'sm', backdrop:"static" });
  
  modalReference.result.then((result) => {
    
  
      // source: this.workflowLink.sourceNode.nodeLinkId
      // ,target:this.workflowLink.targetNode.nodeLinkId
  
      this.links.push(this.link);
      this.links=[...this.links];
      this.linkUpdated.emit(this.links);
      
  }, (reason) => {
      
  });
}
//#endregion Modal
   
    
  
}
