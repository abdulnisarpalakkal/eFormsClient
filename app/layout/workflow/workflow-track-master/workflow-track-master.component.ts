import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { WorkflowTrackMaster } from '../../../model/workflow-track-master';
import { WorkflowService,RefreshService } from '../../../shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workflow-track-master',
  templateUrl: './workflow-track-master.component.html',
  styleUrls: ['./workflow-track-master.component.scss']
})
export class WorkflowTrackMasterComponent implements OnInit,OnDestroy {
  @Input() processId:number;
  workflowTrackMasterId:number;
  workflowTracksList:WorkflowTrackMaster[];

  closeResult: string;
  modalReference: any;
  @ViewChild('myTable', {static: false}) table: any;
  subscription: Subscription;
  constructor(private workflowService:WorkflowService,private modalService: NgbModal,private refreshService:RefreshService) { }

  ngOnInit() {
    this.getAllWorkflowTracks();
    this.subscription=this.refreshService.getRefreshObservable().subscribe(message=>{
      this.getAllWorkflowTracks();
    });
  }
  getAllWorkflowTracks(){
    const service=this.processId
    ?this.workflowService.getAllWorkflowTrackMasterByProcess(this.processId):this.workflowService.getAllWorkflowTrackMasterByUser();
    service
    .subscribe(data=>{
          this.workflowTracksList=data;
         
    },error=>{
    })
  }

  

//#region Modal window
//#region Modal 1
open(content,workflowTrackMaster:WorkflowTrackMaster) {

  this.workflowTrackMasterId=workflowTrackMaster.id;
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
toggleExpandRow(row:WorkflowTrackMaster) {
  console.log('Toggled Expand Row!', row);
  this.table.rowDetail.toggleExpandRow(row);
}
onDetailToggle(event) {
  console.log('Detail Toggled', event);
}
getTrackMasterId(row:WorkflowTrackMaster){
 return row.id;
}
ngOnDestroy(){
  this.subscription.unsubscribe();
}
}
