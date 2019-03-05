import { Component,EventEmitter, OnInit,Input,Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import {FormDesign} from '../../../model/form-design.model';
import { FormMaster } from '../../../model/form-master.model';
import {VirtualTableFields} from '../../../model/virtual-table-fields.model';
import {FormComponentEnum} from '../../../model/form-component.enum';
import { UserMsg } from '../../../model/user-msg.model';

@Component({
  selector: 'app-form-design-modal',
  templateUrl: './form-design-modal.component.html',
  styleUrls: ['./form-design-modal.component.scss']
})
export class FormDesignModalComponent implements OnInit {
  @Input() form: FormMaster;
  @Input() formDesignList: FormDesign[]=[];
  @Input() virtualTableFieldsList: VirtualTableFields[]=[];
  @Output() updated = new EventEmitter<FormMaster>();
  
  @Input() msgOb:UserMsg=new UserMsg();

  formDesign:FormDesign;
  isNew:boolean; 
  showMenu: string = '';
  pages:boolean[]=[];
  listStyle: any;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.pages[0]=true;
    this.listStyle = {
      width:'100%', //width of the list defaults to 300
      height: '100%', //height of the list defaults to 250
    }
   
  }
  toggleExpandClass(index: number) {
        this.pages[index]=!this.pages[index];
       
    }
    onUpdate(virtualTableForm:NgForm) {
        // this.form.virtualTableMaster= this.virtualTableList.find(x=>x.id == this._virtualTableId);
        // this.updated.emit(this.form);
      }
      autoGenerateComponents()
      {
        
        if(this.formDesignList.length==0 )
        {
          this.virtualTableFieldsList.forEach((field,index) => {
            const component:FormDesign=new FormDesign();
            component.componentName=field.fieldName;
            component.componentLabel=field.fieldName;
            component.componentType=FormComponentEnum.TEXT;
            component.alignOrder=index+1;
            component.formMaster=this.form;
            component.virtualTableField=field;
            this.formDesignList.push(component);
          });
        }
      }
      createNewComponent(){
        const component:FormDesign=new FormDesign();
            // component.componentName=field.fieldName;
            // component.componentLabel=field.fieldName;
            component.componentType=FormComponentEnum.TEXT;
            component.alignOrder=this.formDesignList.length+1;
            component.formMaster=this.form;
            // component.virtualTableField=field;
            this.formDesignList.push(component);
      }
      deleteComponent(formDesign:FormDesign){
        const index = this.formDesignList.indexOf(formDesign, 0);
        if (index > -1) {
          this.formDesignList.splice(index, 1);
        }
      }
      editComponent(formDesign:FormDesign){
        this.formDesign=formDesign;
        this.formDesign.virtualTableField=this.virtualTableFieldsList.find(x=>x.fieldName==this.formDesign.virtualTableField.fieldName);
      }

      listOrderChanged(formDesignList){
        this.formDesignList.forEach((FormDesign,index)=>{
          FormDesign.alignOrder=index+1;
        });
        
      }
      drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.formDesignList, event.previousIndex, event.currentIndex);
        this.formDesignList.forEach((FormDesign,index)=>{
          FormDesign.alignOrder=index+1;
        });
      }
}
