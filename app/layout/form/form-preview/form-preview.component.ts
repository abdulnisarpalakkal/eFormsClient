import { Component,EventEmitter, OnInit,Input,Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import {FormDesign} from '../../../model/form-design.model';
import { FormMaster } from '../../../model/form-master.model';
import { FormComponentEnum } from '../../../model/form-component.enum';

@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html'
  
})
export class FormPreviewComponent implements OnInit {
  @Input() form: FormMaster;
  @Input() formDesignList: FormDesign[]=[];
  selectComponent:FormComponentEnum=FormComponentEnum.COMPO;
  labelComponent:FormComponentEnum=FormComponentEnum.LABEL;
  radioComponent:FormComponentEnum=FormComponentEnum.RADIO;
  checkComponent:FormComponentEnum=FormComponentEnum.CHECKBOX;;
  dateComponent:FormComponentEnum=FormComponentEnum.DATE;
  constructor() { }

  ngOnInit() {
    this.selectComponent= FormComponentEnum.COMPO;
    this.labelComponent= FormComponentEnum.LABEL;
    this.formDesignList=this.formDesignList.sort((design1,design2):number=>{
      return design1.alignOrder<design2.alignOrder?-1:1;
    });
  }

}
