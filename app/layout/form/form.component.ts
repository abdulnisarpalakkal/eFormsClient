import { Component, OnInit,ViewChild,ViewEncapsulation, Input, ViewChildren } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';

import { routerTransition } from './../../router.animations';
import {VirtualTableService,FormService,AdministrationService,Handler} from '../../shared';
import {FormMaster} from '../../model/form-master.model';
import {VirtualTable} from '../../model/virtual-table.model';
import {VirtualTableFields} from '../../model/virtual-table-fields.model';
import {FormDesign} from '../../model/form-design.model';
import { UserRoles } from '../../model/user-roles.model';
import { VirtualTableConstraintType } from '../../model/virtual-table-constraints-type.model';
import { FormDesignDto } from '../../model/form-design-dto.model';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [routerTransition()]
})
export class FormComponent implements OnInit {
//#region  Variables
@Input() processId:number;
virtualTableList:VirtualTable[]=[];
virtualTableFieldsList: VirtualTableFields[]=[];
formList:FormMaster[]=[];
formDesignDto:FormDesignDto;
formComponentTypes: String[]=[];
userRoles:UserRoles[];
refTableMap:any;

temp = [];
modalform: FormMaster;
public filter_Form: FormMaster;
closeResult: string;
modalReference: any;
modalReference2: any;
closeResult2: string;
isNew :boolean=false;

@ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;
@ViewChild("content2", {static: false}) designContent:any;

//#endregion
  constructor(private formService: FormService,private virtualTableService: VirtualTableService,private modalService: NgbModal, private handler:Handler,private administrationService:AdministrationService) { }

  ngOnInit() {
    this.getVirtualTableList();
    this.getFormsList();
    this.getUserRoles();
    this.filter_Form=new FormMaster();
  }
//#region Filters 
updateFilterEvent(event) {
  this.updateFilter();
}
updateFilter(){
  const formName =  this.filter_Form.formName?this.filter_Form.formName.toLowerCase():null;
 
  var valid=false;
  // filter our data
  const temp = this.temp.filter(function(d) {
      valid=  (!formName || (d.formName && (d.formName.toLowerCase()).indexOf(formName) !== -1))  ;
      return valid;
  });
  // update the rows
  this.formList = temp;
  // Whenever the filter changes, always go back to the first page
  this.table.offset = 0;
}
//#endregion

//#region handlers


//#endregion


//#region Modal window
//#region Modal 1
open(content,form:FormMaster,isNew) {
  this.isNew=isNew;
  if(!isNew)
  {
    this.modalform=form;
  }
  else
    this.modalform=new FormMaster();
  this.modalReference=this.modalService.open(content,{ size: 'lg', backdrop:"static" });
  
  this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
closeModal() {
  this.modalReference.close();

}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return  `with: ${reason}`;
  }
}
//#endregion Modal1
//#region Modal2
openDesignModal(content,form:FormMaster) {
  this.modalform=form;
  this.modalReference2=this.modalService.open(content,{ size: 'lg', backdrop:"static", windowClass:'modal-full custom_modal_dialog custom_modal_content' });
  
  this.modalReference2.result.then((result) => {
      this.closeResult2 = `Closed with: ${result}`;
     
  }, (reason) => {
      this.closeResult2 = `Dismissed ${this.getDismissReasonDesignModal(reason)}`;
  });
}
closeDesignModal() {
  this.modalReference2.close();

}
private getDismissReasonDesignModal(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
  } else {
      return  `with: ${reason}`;
  }
}
//#endregion Modal2
//#region Modal 1
openPreview(prevContent,designContent) {
  
  const modalReference=this.modalService.open(prevContent,{ size: 'lg', backdrop:"static" });
  this.modalReference2.close();
  modalReference.result.then((result) => {
    this.openDesignModal(designContent,this.modalform);
  }, (reason) => {
    this.openDesignModal(designContent,this.modalform);
  });
}


//#endregion Modal1

//#endregion


//#region Service calls
public getFormsList() {
  const service=this.processId?this.formService.getAllUnderProcess(this.processId):this.formService.get();
  service
  .subscribe(
        data => {
          this.temp = [...data];
          this.formList=data;   
          this.updateFilter(); 
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
public getVirtualTableList() {
  const getTablesCall=this.processId?this.virtualTableService.getByProcess(this.processId)
                        :this.virtualTableService.get();
  getTablesCall
  .subscribe(
        data => {
          this.virtualTableList=data;   
        },
        error=>{
     
        }
  );
}
public getFormComponentTypesList() {
  this.formService.getAllFormComponentTypes()
  .subscribe(
        data => {
          this.formComponentTypes=data;   
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
public getUserRoles(){
  this.administrationService.getUserRoles()
  .subscribe(data=>{
    this.userRoles=data;
  },error=>{
  });
}
delete(form:FormMaster){
  if(!confirm("Are you sure to delete "+form.formName)) {
      return;
  }
  this.formService.delete(form)
  .subscribe(
      data => {
        this.getFormsList();
      
      },
      error=>{
          this.getFormsList();
      }
  );
}

onUpdated(form: FormMaster) {
      
  if(this.isNew)
  {
    
    
    this.formService.create(form)
    .subscribe(
        data => {
          this.closeModal();
          this.getFormsList();
        },
        error=>{
        }
    );
  }
  else
  {
    this.formService.update(form)
    .subscribe(
        data => {
          this.closeModal();
          this.getFormsList();
        },
        error=>{
        }
    );
  }


}

//#endregion
//#region event listeners
public designClick(content,form:FormMaster){
  this.modalform=form;
  // this.getVirtualTableFieldList(form.virtualTableMaster);
  // this.getFormDesignList(form.id);
  // this.openDesignModal(content,form);
  this.openDesignPage();
}

//#endregion event listeners
  public openDesignPage(){
    this.getVirtualTableFieldList(this.modalform.virtualTableMaster);
    this.getFormDesignList(this.modalform.id);
    this.openDesignModal(this.designContent,this.modalform);
  }
}
