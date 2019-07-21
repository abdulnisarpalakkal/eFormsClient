import { Component,EventEmitter, OnInit,Input,Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {FormDesign} from '../../../../model/form-design.model';
import {FormComponentEnum} from '../../../../model/form-component.enum';


@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title">Component deletion</h5>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete this component?</strong></p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
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
  selector: 'app-form-component-dir',
  templateUrl: './form-component-dir.component.html',
  styleUrls:['./form-component-dir.component.scss']
})
export class FormComponentDirComponent implements OnInit {
  @Input() formDesign: FormDesign;
  @Output() deleteComponentEmit = new EventEmitter<FormDesign>();
  @Output() editComponentEmit = new EventEmitter<FormDesign>();
  componentTypeList:String[]=[];
  selected:boolean;
  componentType:String;
  selectComponent:FormComponentEnum=FormComponentEnum.COMPO;
  labelComponent:FormComponentEnum=FormComponentEnum.LABEL;
  radioComponent:FormComponentEnum=FormComponentEnum.RADIO;
  checkComponent:FormComponentEnum=FormComponentEnum.CHECKBOX;;
  dateComponent:FormComponentEnum=FormComponentEnum.DATE;
  constructor(private _modalService: NgbModal) { }

  ngOnInit() {
    // this.formDesign.componentType=FormComponentEnum.TEXT;
    this.componentTypeList=Object.values(FormComponentEnum);
    
  }
  toggleSelected(){
    this.selected=!this.selected;
  }
  focus(){
    this.selected=true;
    this.editComponentEmit.emit(this.formDesign);
  }
  focusout(){
    this.selected=false;
  }
  deleteComponent(){
    const modalReference=this._modalService.open(MODALS["focusFirst"]);
    modalReference.result.then((result) => {
      this.deleteComponentEmit.emit(this.formDesign);
    }, (reason) => {
        
    });
    
    
  }
  

}
