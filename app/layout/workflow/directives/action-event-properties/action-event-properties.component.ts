import { Component,EventEmitter, OnInit,Input,Output } from '@angular/core';
import { ActionEventObject } from '../../../../model/action-event-object.model';
import { User } from '../../../../model/user.model';
import { UserRoles } from '../../../../model/user-roles.model';
import { NgbActiveModal,NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActionEventParamObject } from '../../../../model/action-event-param-object.model';

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Event deletion</h5>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete this event?</strong></p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">No</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Yes</button>
  </div>
  `
})
export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

const MODALS = {
  focusFirst: NgbdModalConfirm
 
};

@Component({
  selector: 'app-action-event-properties',
  templateUrl: './action-event-properties.component.html'
})
export class ActionEventPropertiesComponent implements OnInit {
  @Input() actionEventObject:ActionEventObject;
  // @Input() actionEventParams:ActionEventParam[];
  @Input() users:User[];
  @Input() userGroups:UserRoles[];
  @Output() deleteEventEmit = new EventEmitter<ActionEventObject>();
  // _user:User;
  // _userGroup:UserRoles;

  constructor(private _modalService: NgbModal) { }

  ngOnInit() {
  }
  public deleteEventClick(){
    const modalReference=this._modalService.open(MODALS["focusFirst"]);
    modalReference.result.then((result) => {
      this.deleteEventEmit.emit(this.actionEventObject);
    }, (reason) => {
        
    });
    
  }
  onChangeUser(actionEventParamObject:ActionEventParamObject){
    // actionEventParamObject
  }

}
