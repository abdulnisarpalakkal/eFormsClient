import { Component, OnInit,OnDestroy, Input } from '@angular/core';

import { WorkflowTrackDet } from './../../../model/workflow-track-det';
import {WorkflowService,RefreshService} from './../../../shared';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-workflow-track',
  templateUrl: './workflow-track.component.html'
})
export class WorkflowTrackComponent implements OnInit,OnDestroy {
  @Input() processId:number;
  @Input() workflowTrackMasterId:number;
  subscription: Subscription;
  workflowTrackList:WorkflowTrackDet[];
  constructor(private workflowService:WorkflowService,private refreshService:RefreshService) { }

  ngOnInit() {
    this.getAllWorkflowTrackDet();
    // this.subscription=this.refreshService.getRefreshObservable().subscribe(message=>{
    //   this.getAllWorkflowTrackDet();
    // });
  }
  getAllWorkflowTrackDet(){
    var service=this.workflowService.getAllWorkflowTrackDetByUser();
    if(this.workflowTrackMasterId)
      service=this.workflowService.getAllWorkflowTrackDetByWorkflowTrackMaster(this.workflowTrackMasterId);
    else if(this.processId)
      service=this.workflowService.getAllWorkflowTrackDetByProcess(this.processId)
   
    service
    .subscribe(data=>{
          this.workflowTrackList=data;
         
    },error=>{
    })
  }
  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }

}
