import { Component, OnInit, Input } from '@angular/core';
import { UserMsg } from '../../../model/user-msg.model';

@Component({
  selector: 'app-msg-view',
  templateUrl: './msg-view.component.html',
  styleUrls: ['./msg-view.component.scss']
})
export class MsgViewComponent implements OnInit {
  @Input() msgOb: UserMsg=new UserMsg();
  constructor() { }

  ngOnInit() {
  }

}
