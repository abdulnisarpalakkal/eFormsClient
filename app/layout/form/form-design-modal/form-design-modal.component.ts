import { Component,EventEmitter, OnInit,Input,Output, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import {FormDesign} from '../../../model/form-design.model';
import {FormComponent} from '../../../model/form-component.model';
import { FormMaster } from '../../../model/form-master.model';
import {VirtualTableFields} from '../../../model/virtual-table-fields.model';
import {FormComponentEnum} from '../../../model/form-component.enum';
import { UserMsg } from '../../../model/user-msg.model';
import { FormComponentRefValue } from '../../../model/form-component-ref-value.model';
import { FormDesignDto } from '../../../model/form-design-dto.model';
import { TableData } from '../../administration/user/table/table-data';
import { TabsetComponent } from 'ng-uikit-pro-standard';
import { ActivatedRoute } from '@angular/router';
import { VirtualTableService, FormService } from '../../../shared';
import { VirtualTableConstraintType } from '../../../model/virtual-table-constraints-type.model';
import { VirtualTable } from '../../../model/virtual-table.model';

@Component({
  selector: 'app-form-design-modal',
  templateUrl: './form-design-modal.component.html',
  styleUrls: ['./form-design-modal.component.scss']
})
export class FormDesignModalComponent implements OnInit,AfterViewInit {
 
  form: FormMaster;
  formDesignDto: FormDesignDto;
  virtualTableFieldsList: VirtualTableFields[]=[];
  refTableMap:any;
   updated = new EventEmitter<FormMaster>();
  
  formDesign:FormDesign;
  isNew:boolean; 
  formId:number;
  
  
  @ViewChild('staticTabs', {static: false}) staticTabs: TabsetComponent;
  constructor(private route: ActivatedRoute,private virtualTableService: VirtualTableService,private formService: FormService,private modalService: NgbModal) { }

  ngOnInit() {
  
    this.route.paramMap.subscribe(params=>{
      this.formId=+params.get("id");//+using to convert string to number
      if(this.formId){
        this.getFormDataUsingId(this.formId);
      }
    });
  }
  ngAfterViewInit(): void {
    // this.tabs.select("rules");
  }
  toggleExpandClass(index: number) {
        // this.pages[index]=!this.pages[index];
       
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
            component.formComponent=new FormComponent();

            component.componentName=field.fieldName;
            component.formComponent.componentLabel=field.fieldName;
            component.alignOrder=index+1;
            component.formMaster=this.form;
            component.formComponent.virtualTableField=field;
            if(this.refTableMap.has(component.formComponent.virtualTableField.fieldName) 
            && (!component.formComponent.componentRefValues|| component.formComponent.componentRefValues.length==0)){
              component.formComponent.componentRefValues=[];
              component.formComponent.componentRefValues.push(new FormComponentRefValue());
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
        component.formComponent=new FormComponent();
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
        this.staticTabs.setActiveTab(2);
        this.formDesign=formDesign;
        this.formDesign.formComponent.virtualTableField=this.virtualTableFieldsList
        .find(x=>x.fieldName==this.formDesign.formComponent.virtualTableField.fieldName);
       

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


    /**
     * Service calls
     */
    public getFormDataUsingId (formId) {
      this.formService.getOne(formId)
      .subscribe(
            data => {
                this.form=data;   
                this.loadDataForDesignPage();
             });
    } 
  
    public loadDataForDesignPage(){
      this.getVirtualTableFieldList(this.form.virtualTableMaster);
      this.getFormDesignList(this.form.id);
      
    }
   
    public getRefTableFieldNamesList(fieldName:string,tableId:number) {
      this.virtualTableService.getTableFieldNamesByTable(tableId)
      .subscribe(
            data => {
                this.refTableMap.set(fieldName,data); 
            },
            error=>{
            }
      );
    }
    public getVirtualTableFieldList(table:VirtualTable) {
      this.virtualTableService.getTableFieldsByTable(table.id)
      .subscribe(
            data => {
              this.virtualTableFieldsList=data; 
              this.refTableMap=new Map();
              this.virtualTableFieldsList.forEach(field=>{
                if(field.fieldConstraintList){ //checking the field is having constraint
                  field.fieldConstraintList.forEach(constraint=>{
                    if(constraint.constraintType==VirtualTableConstraintType.FOREIGN_KEY) //checking whether constraint is foreign contraint or not
                        this.getRefTableFieldNamesList(field.fieldName,constraint.foreignConstraint.virtualTableField.virtualTableMaster.id); //get all field names of referenced table
                  });
                }
                
              })  
              
            },
            error=>{
            }
      );
    }
    public getFormDesignList (formId) {
      this.formService.getAllFormDesignByFormId(formId)
      .subscribe(
            data => {
    
              this.formDesignDto=data;   
              if(this.formDesignDto!=null && this.formDesignDto.formDesigns!=null){
                this.formDesignDto.formDesigns=this.formDesignDto.formDesigns.sort((design1,design2):number=>{
                  return design1.alignOrder<design2.alignOrder?-1:1;
                });
              }
            },
            error=>{
            }
      );
    }
    onUpdatedDesign() {
      this.formService.updateDesign(this.formDesignDto)
        .subscribe(
            data => {
             
            },
            error=>{
            }
        );
    }
    /**
     * End service calls
     */
    //#region Modal 1
openPreview(prevContent) {
  
  const modalReference=this.modalService.open(prevContent,{ size: 'lg', backdrop:"static" });
  
}


//#endregion Modal1
}
