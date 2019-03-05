import { Component, OnInit,ViewChild,ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';

import { routerTransition } from './../../router.animations';
import {VirtualTableService,FormService,AdministrationService,Handler} from '../../shared';
import {FormMaster} from '../../model/form-master.model';
import {VirtualTable} from '../../model/virtual-table.model';
import {VirtualTableFields} from '../../model/virtual-table-fields.model';
import {FormDesign} from '../../model/form-design.model';
import { UserRoles } from '../../model/user-roles.model';
import { MsgInterface } from '../interface/msg-interface';
import { UserMsg } from '../../model/user-msg.model';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [routerTransition()]
})
export class FormComponent implements OnInit,MsgInterface {
//#region  Variables
virtualTableList:VirtualTable[]=[];
virtualTableFieldsList: VirtualTableFields[]=[];
formList:FormMaster[]=[];
formDesignList:FormDesign[]=[];
formComponentTypes: String[]=[];
userRoles:UserRoles[];

temp = [];
modalform: FormMaster;
public filter_Form: FormMaster;
msgOb:UserMsg=new UserMsg();
closeResult: string;
modalReference: any;
modalReference2: any;
closeResult2: string;
isNew :boolean=false;

@ViewChild(DatatableComponent) table: DatatableComponent;

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
successHandler(msg)
{
   
    this.msgOb.msg=msg;
    this.msgOb=this.handler.getSuccessMsgObject(this.msgOb);
}
errorHandler(error)
{
    this.msgOb.msg=error;
    this.msgOb=this.handler.getErrorMsgObject( this.msgOb);
    
}

//#endregion


//#region Modal window
//#region Modal 1
open(content,form:FormMaster,isNew) {
  this.msgOb.msg=null;
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
  this.msgOb.msg=null;
  this.modalform=form;
  this.modalReference2=this.modalService.open(content,{ size: 'lg', backdrop:"static", windowClass:'modal-xl custom_modal_dialog custom_modal_content' });
  
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
  this.formService.get()
  .subscribe(
        data => {
          this.temp = [...data];
          this.formList=data;   
          this.updateFilter(); 
        },
        error=>{
         
          this.errorHandler(error);
        }
  );
}
public getFormDesignList (formId) {
  this.formService.getAllFormDesignByFormId(formId)
  .subscribe(
        data => {
          this.formDesignList=data;   
          if(this.formDesignList!=null){
            this.formDesignList=this.formDesignList.sort((design1,design2):number=>{
              return design1.alignOrder<design2.alignOrder?-1:1;
            });
          }
        },
        error=>{
          this.errorHandler(error);
        }
  );
}
public getVirtualTableList() {
  this.virtualTableService.get()
  .subscribe(
        data => {
          this.virtualTableList=data;   
        },
        error=>{
     
          this.errorHandler(error);
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
          this.errorHandler(error);
        }
  );
}
public getVirtualTableFieldList(table:VirtualTable) {
  this.virtualTableService.getTableFieldsByTable(table.id)
  .subscribe(
        data => {
          this.virtualTableFieldsList=data;   
        },
        error=>{
     
          this.errorHandler(error);
        }
  );
}
public getUserRoles(){
  this.administrationService.getUserRoles()
  .subscribe(data=>{
    this.userRoles=data;
  },error=>{
    this.errorHandler(error);
  });
}
delete(form:FormMaster){
  if(!confirm("Are you sure to delete "+form.formName)) {
      return;
  }
  this.formService.delete(form)
  .subscribe(
      data => {
        this.successHandler("Form "+form.formName+" deleted successfully");
        this.getFormsList();
      
      },
      error=>{
          this.errorHandler(error);
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
          this.successHandler("Form "+form.formName+" saved successfully");
          this.closeModal();
          this.getFormsList();
        },
        error=>{
            this.errorHandler(error);
        }
    );
  }
  else
  {
    this.formService.update(form)
    .subscribe(
        data => {
          this.successHandler("Form "+form.formName+" updated successfully");
          this.closeModal();
          this.getFormsList();
        },
        error=>{
            this.errorHandler(error);
        }
    );
  }


}
onUpdatedDesign() {
  this.formService.updateDesign(this.formDesignList)
    .subscribe(
        data => {
          this.successHandler("Form design "+this.modalform.formName+" updated successfully");
          this.closeModal();
          this.getFormsList();
        },
        error=>{
            this.errorHandler(error);
        }
    );
}
//#endregion
//#region event listeners
public designClick(content,form:FormMaster){
  this.getVirtualTableFieldList(form.virtualTableMaster);
  this.getFormDesignList(form.id);
  this.openDesignModal(content,form);
}

//#endregion event listeners

}
