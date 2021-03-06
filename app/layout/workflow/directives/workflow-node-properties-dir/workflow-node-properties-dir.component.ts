import { Component,EventEmitter, OnInit,Input,Output } from '@angular/core';
import { WorkflowNode } from '../../../../model/workflow-node.model';
import { FormMaster } from '../../../../model/form-master.model';
import { ActionEvent } from '../../../../model/action-event.model';
import { ActionEventObject } from '../../../../model/action-event-object.model';
import { User } from '../../../../model/user.model';
import { UserRoles } from '../../../../model/user-roles.model';
import { ActionEventParam } from '../../../../model/action-event-param.model';
import { ActionEventParamObject } from '../../../../model/action-event-param-object.model';

@Component({
  selector: 'app-workflow-node-properties-dir',
  templateUrl: './workflow-node-properties-dir.component.html'
})
export class WorkflowNodePropertiesDirComponent implements OnInit {
  @Input() node: WorkflowNode;
  @Input() formList: FormMaster[] ;
  @Input() actionEventList: ActionEvent[] ;
  @Input() users:User[];
  @Input() userGroups:UserRoles[];
  // @Input() actionEventParamList:ActionEventParam[];

  constructor() { }

  ngOnInit() {
    if(this.node==null){
      this.node=new WorkflowNode();
     
    }
    
  }
  onChangeForm(form:FormMaster){
   
    this.node.formMaster=form; 
  }
  onChangeAction(action:ActionEvent){
    const actionEventObject=new ActionEventObject();
    this.node.actionEventObjects.push(actionEventObject); 
  }
  OnAddEventClick(actionEvent:ActionEvent){
    
     const actionEventObject=new ActionEventObject();
     actionEventObject.actionEvent=actionEvent;
     actionEventObject.actionEventParamObjects=[];

    //  const actionEventParamsSelected=this.actionEventParamList.filter(param=>param.actionEvent.id==actionEvent.id);

     
    actionEvent.actionEventParams.forEach(actionEventParam => {
      const actionEventParamObject=new ActionEventParamObject();
      actionEventParamObject.actionEventParam=actionEventParam;
      actionEventObject.actionEventParamObjects.push(actionEventParamObject);
     });

     if(this.node.actionEventObjects==null)
     this.node.actionEventObjects=[];
    this.node.actionEventObjects.push(actionEventObject); 

  }

  deleteEvent(actionEventObject:ActionEventObject){
    const index = this.node.actionEventObjects.indexOf(actionEventObject, 0);
    if (index > -1) {
      this.node.actionEventObjects.splice(index, 1);
    }
  }

}
