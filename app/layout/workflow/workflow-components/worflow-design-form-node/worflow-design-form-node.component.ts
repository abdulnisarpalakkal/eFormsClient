import { Component, OnInit, Input } from '@angular/core';
import { WorkflowNode } from '../../../../model/workflow-node.model';
import { FormMaster } from '../../../../model/form-master.model';
import { WorkflowMaster } from '../../../../model/workflow-master.model';
import { ActionEvent } from '../../../../model/action-event.model';
import { User } from '../../../../model/user.model';
import { UserRoles } from '../../../../model/user-roles.model';

@Component({
  selector: 'app-worflow-design-form-node',
  templateUrl: './worflow-design-form-node.component.html',
  styleUrls: ['./worflow-design-form-node.component.scss']
})
export class WorflowDesignFormNodeComponent implements OnInit {
  @Input() formNode: WorkflowNode;
  @Input() formList: FormMaster[] ;
  @Input() childWokflowList: WorkflowMaster[] ;
  @Input() actionEventList: ActionEvent[] ;
  @Input() users:User[];
  @Input() userGroups:UserRoles[];
  
  @Input() totalActionNodes:WorkflowNode[];
  constructor() { }

  ngOnInit() {
  }

}
