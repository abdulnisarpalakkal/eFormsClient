import { Component,EventEmitter, OnInit,Input,Output, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import {FormDesign} from '../../../model/form-design.model';
import { FormMaster } from '../../../model/form-master.model';
import {VirtualTableFields} from '../../../model/virtual-table-fields.model';
import {FormComponentEnum} from '../../../model/form-component.enum';
import { UserMsg } from '../../../model/user-msg.model';
import { FormComponentRefValue } from '../../../model/form-component-ref-value.model';
import { FormDesignDto } from '../../../model/form-design-dto.model';
import { TableData } from '../../administration/user/table/table-data';

@Component({
  selector: 'app-form-design-modal',
  templateUrl: './form-design-modal.component.html',
  styleUrls: ['./form-design-modal.component.scss']
})
export class FormDesignModalComponent implements OnInit,AfterViewInit {
 
  @Input() form: FormMaster;
  @Input() formDesignDto: FormDesignDto;
  @Input() virtualTableFieldsList: VirtualTableFields[]=[];
  @Input() refTableMap:any;
  @Output() updated = new EventEmitter<FormMaster>();
  
  @Input() msgOb:UserMsg=new UserMsg();
  // formDesignList:FormDesign[]=[];
  formDesign:FormDesign;
  isNew:boolean; 
  showMenu: string = '';
  pages:boolean[]=[];
  listStyle: any;
  @ViewChild('tabs') 
  private tabs:NgbTabset;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.pages[0]=true;
    this.listStyle = {
      width:'100%', //width of the list defaults to 300
      height: '100%', //height of the list defaults to 250
    }
   
  }
  ngAfterViewInit(): void {
    // this.tabs.select("rules");
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
        
        if(this.formDesignDto.formDesigns.length==0 )
        {
          this.virtualTableFieldsList.forEach((field,index) => {
            const component:FormDesign=new FormDesign();
            component.componentName=field.fieldName;
            component.componentLabel=field.fieldName;
            component.alignOrder=index+1;
            component.formMaster=this.form;
            component.virtualTableField=field;
            if(this.refTableMap.has(component.virtualTableField.fieldName) && !component.componentRefValues){
              component.componentRefValues=[];
              component.componentRefValues.push(new FormComponentRefValue());
              component.componentType=FormComponentEnum.COMPO;
            }
            else{
              component.componentType=FormComponentEnum.TEXT;

            }
            this.formDesignDto.formDesigns.push(component);
          });
        }
      }
      createNewComponent(){
        const component:FormDesign=new FormDesign();
            // component.componentName=field.fieldName;
            // component.componentLabel=field.fieldName;
            component.componentType=FormComponentEnum.TEXT;
            component.alignOrder=this.formDesignDto.formDesigns.length+1;
            component.formMaster=this.form;
            // component.virtualTableField=field;
            this.formDesignDto.formDesigns.push(component);
      }
      deleteComponent(formDesign:FormDesign){
        const index = this.formDesignDto.formDesigns.indexOf(formDesign, 0);
        if (index > -1) {
          this.formDesignDto.formDesigns.splice(index, 1);
        }
      }
      editComponent(formDesign:FormDesign){
        this.tabs.select("component");
        this.formDesign=formDesign;
        this.formDesign.virtualTableField=this.virtualTableFieldsList.find(x=>x.fieldName==this.formDesign.virtualTableField.fieldName);
       

      }

      listOrderChanged(formDesignList){
        this.formDesignDto.formDesigns.forEach((FormDesign,index)=>{
          FormDesign.alignOrder=index+1;
        });
        
      }
      drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.formDesignDto.formDesigns, event.previousIndex, event.currentIndex);
        this.formDesignDto.formDesigns.forEach((FormDesign,index)=>{
          FormDesign.alignOrder=index+1;
        });
      }
}
