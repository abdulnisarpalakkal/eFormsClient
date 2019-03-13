import { Component, OnInit, Input ,ViewEncapsulation, Output,EventEmitter} from '@angular/core';
import { UserMsg } from '../../../model/user-msg.model';
import { routerTransition } from '../../../router.animations';
@Component({
  selector: 'app-msg-view',
  templateUrl: './msg-view.component.html',
 
  styleUrls: ['./msg-view.component.scss'],
  animations: [routerTransition()]
})
export class MsgViewComponent implements OnInit {
  @Input() msgOb: UserMsg=new UserMsg();
  @Output() deleted=new EventEmitter<UserMsg>();
  constructor() { }

  ngOnInit() {
  }

  deleteMsg(){
    this.deleted.emit(this.msgOb);
    
  }
}
