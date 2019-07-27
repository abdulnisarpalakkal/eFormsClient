import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { WorkflowNode } from '../../../../model/workflow-node.model';
import { FormMaster } from '../../../../model/form-master.model';
import { WorkflowMaster } from '../../../../model/workflow-master.model';
import { ActionEvent } from '../../../../model/action-event.model';
import { User } from '../../../../model/user.model';
import { UserRoles } from '../../../../model/user-roles.model';
import { WorkflowNodeType } from '../../../../model/workflow-node-type.enum';
import { WorkflowLink } from '../../../../model/workflow-link.model';
import { WorkflowUtilityService } from '../../workflow-services/workflow-utility-service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-workflow-disign-modal',
  templateUrl: './workflow-disign-modal.component.html',
  styleUrls: ['./workflow-disign-modal.component.scss']
})
export class WorkflowDisignModalComponent implements OnInit {
  //formal arguments 
 nextNodeTypes:WorkflowNodeType[];
 sourceNode:WorkflowNode;
//  nodes:WorkflowNode[];
//  links:WorkflowLink[];
 formList: FormMaster[] ;
 childWokflowList: WorkflowMaster[] ;
 actionEventList: ActionEvent[] ;
 users:User[];
 userGroups:UserRoles[];
 
 //end formal arguments
 //return events
 action: Subject<WorkflowNode> = new Subject();
 //end return events

 //variables
 childNode:WorkflowNode;
 nextNodeTypeModel:WorkflowNodeType;
 //end variables

 
  constructor(public modalRef: MDBModalRef,public utilityService:WorkflowUtilityService) { }

  ngOnInit() {
    this.nextNodeTypeModel=this.nextNodeTypes[0];
    this.generateNode();
    
  }
  generateNode(){
   
    if(!this.childNode)
      this.childNode=new WorkflowNode;

      switch(this.nextNodeTypeModel){
        case WorkflowNodeType.FORM:
            this.generateFormNode();
            break;
        case WorkflowNodeType.ACTION:
            this.childNode=this.utilityService.generateNode(WorkflowNodeType.ACTION);
            break;
        case WorkflowNodeType.CHILD_WORKFLOW:
            this.childNode=this.utilityService.generateNode(WorkflowNodeType.CHILD_WORKFLOW);
            break;
        case WorkflowNodeType.STOP:
            this.childNode=this.utilityService.generateNode(WorkflowNodeType.STOP);
            break;
        default:
          break;

      }
     
    }
  
  generateFormNode(){
    this.childNode=this.utilityService.generateNode(WorkflowNodeType.FORM);
  }
  // findExistingChildNodes(){
  //   if(!this.links || this.links.findIndex(link=>link.source==this.sourceNode.id )==-1 )
  //     return null;
  //   var childNodes:WorkflowNode[]=this.links.filter(link=>link.source===this.sourceNode.id )
  //   .map(link=>this.nodes.find(node=>node.nodeId==link.targetNode.nodeId));
    
  //   childNodes.forEach(childNode=>{
     
  //     childNode.formMaster=childNode.formMaster?this.formList.find(x=>x.id==childNode.formMaster.id):null; //for getting same object
  //     childNode.childWorkflow=childNode.childWorkflow?this.childWokflowList.find(x=>x.id==childNode.childWorkflow.id):null; //for getting same object
     
  //   });
  //   return childNodes;
  
  // }
  appendNodes(){
      this.action.next(this.childNode);
  }
  OnNodeTypeChanged(){
    this.generateNode();
  }
}
