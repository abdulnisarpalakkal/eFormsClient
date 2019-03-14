import { Component,EventEmitter, OnInit,Input,Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import {FormDesign} from '../../../model/form-design.model';
import { FormMaster } from '../../../model/form-master.model';
import { FormComponentEnum } from '../../../model/form-component.enum';
import { UserMsg } from '../../../model/user-msg.model';


@Component({
  selector: 'app-workflow-form-view',
  templateUrl: './workflow-form-view.component.html',
  styleUrls: ['./workflow-form-view.component.scss']
})
export class WorkflowFormViewComponent implements OnInit {
  @Input() form: FormMaster;
  @Input() formDesignList: FormDesign[]=[];
  selectComponent:FormComponentEnum=FormComponentEnum.COMPO;
  labelComponent:FormComponentEnum=FormComponentEnum.LABEL;
  radioComponent:FormComponentEnum=FormComponentEnum.RADIO;
  checkComponent:FormComponentEnum=FormComponentEnum.CHECKBOX;;
  dateComponent:FormComponentEnum=FormComponentEnum.DATE;
  constructor() { }

  ngOnInit() {
    
    this.formDesignList=this.formDesignList.sort((design1,design2):number=>{
      return design1.alignOrder<design2.alignOrder?-1:1;
    });
  }

}
