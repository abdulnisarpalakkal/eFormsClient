import { Component, OnInit, Input } from '@angular/core';
import { FormDesign } from '../../../model/form-design.model';
import { FormComponentEnum } from '../../../model/form-component.enum';

@Component({
  selector: 'app-form-design',
  templateUrl: './form-design.component.html',
  styleUrls: ['./form-design.component.scss']
})
export class FormDesignComponent implements OnInit {
  @Input() formDesign:FormDesign;
  selectComponent:FormComponentEnum=FormComponentEnum.COMPO;
  labelComponent:FormComponentEnum=FormComponentEnum.LABEL;
  radioComponent:FormComponentEnum=FormComponentEnum.RADIO;
  checkComponent:FormComponentEnum=FormComponentEnum.CHECKBOX;
  dateComponent:FormComponentEnum=FormComponentEnum.DATE;
  constructor() { }

  ngOnInit() {
  }

}
