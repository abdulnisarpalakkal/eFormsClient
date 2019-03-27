import { Component, OnInit,ViewChild, ViewChildren,AfterViewInit,QueryList,ChangeDetectorRef, TemplateRef, Input   } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';

import { routerTransition } from './../../../router.animations';
import {VirtualTableService,ProcessService,Handler} from '../../../shared';
import {Process} from '../../../model/process.model';
import {VirtualTable} from '../../../model/virtual-table.model';
import {VirtualTableFields} from '../../../model/virtual-table-fields.model';
import { VirtualTableConstraintType } from './../../../model/virtual-table-constraints-type.model';
import { VirtualTableFieldsConstraintDto } from '../../../model/Virtual-table-fields-constraint-dto.model';

@Component({
  selector: 'app-virtual-table',
  templateUrl: './virtual-table.component.html',
  animations: [routerTransition()]
})
export class VirtualTableComponent implements OnInit {
//#region  Variables
@Input() processId:number;
virtualTableList:VirtualTable[]=[];
processList:Process[]=[];
virtualTableFieldsList: VirtualTableFields[]=[];
virtualTableConstraintList: VirtualTableConstraintType[]=[];
dataTypes: String[]=[];
// virtualTableFieldsConstraintDto:VirtualTableFieldsConstraintDto;

temp = [];

modalVirtualTableFieldsConstraintDto: VirtualTableFieldsConstraintDto;
public filter_VirtualTable: VirtualTable;
public onlyAllowedFilter:boolean;
public onlyNotAllowedFilter:boolean;

closeResult: string;
modalReference: any;
isNew :boolean=false;

@ViewChild(DatatableComponent) table: DatatableComponent;




//#region  date filter variables here if any
//#endregion
//#endregion

  constructor(private processService: ProcessService,private virtualTableService: VirtualTableService,private modalService: NgbModal, private handler:Handler,private changeDetector : ChangeDetectorRef) { }

  ngOnInit() {
    this.getVirtualTableList();
    this.getProcessList();
    this.getDataTypesList();
    
    this.filter_VirtualTable=new VirtualTable();
  }
  
  //#region Filters 
updateFilterEvent(event) {
  this.updateFilter();
}
updateFilter(){
  const tableName =  this.filter_VirtualTable.tableName?this.filter_VirtualTable.tableName.toLowerCase():null;
 
  var valid=false;
  // filter our data
  const temp = this.temp.filter(function(d) {
      valid=  (!tableName || (d.tableName && (d.tableName.toLowerCase()).indexOf(tableName) !== -1))  ;
      return valid;
  });
  // update the rows
  this.virtualTableList = temp;
  // Whenever the filter changes, always go back to the first page
  this.table.offset = 0;
}
//#endregion

//#region Service calls

public getVirtualTableList() {
  const service=this.processId?this.virtualTableService.getByProcess(this.processId):this.virtualTableService.get();
  
  service.subscribe(
        data => {
          this.temp = [...data];
          this.virtualTableList=data;   
          this.updateFilter(); 
        },
        error=>{
          
          // this.success=false;
          // this.msg_class="danger";
          
          // this.msg=error.error?error.error.message:error.message; 
        }
  );
}

public getProcessList() {
  this.processService.get()
  .subscribe(
        data => {
          this.processList=data;   
        },
        error=>{
        }
  );
}
public getDataTypesList() {
  this.virtualTableService.getTableFieldTypes()
  .subscribe(
        data => {
          this.dataTypes=data;   
        },
        error=>{
        }
  );
}
delete(virtualTable:VirtualTable){
  if(!confirm("Are you sure to delete "+virtualTable.tableName)) {
      return;
  }
  this.virtualTableService.delete(virtualTable)
  .subscribe(
      data => {
        this.getVirtualTableList();
      
      },
      error=>{
          this.getVirtualTableList();
      }
  );
}

update() {
 
  if(this.isNew)
  {
   
    // this.modalVirtualTableFieldsConstraintDto.virtualTableConstraints.push(this.virtualTableModal.pkConstraint);
   // this.modalVirtualTableFieldsConstraintDto.virtualTableConstraints.push(this.virtualTableModal.foreignKeyConstraints);
    this.virtualTableService.create(this.modalVirtualTableFieldsConstraintDto)
    .subscribe(
        data => {
          this.closeModal();
          this.getVirtualTableList();
        },
        error=>{
        }
    );
  }
  else
  {
    this.virtualTableService.update(this.modalVirtualTableFieldsConstraintDto)
    .subscribe(
        data => {
          this.closeModal();
          this.getVirtualTableList();
        },
        error=>{
        }
    );
  }


}
//#endregion
//#region handlers

//#endregion handlers


//#region Modal window
open(content,virtualTable:VirtualTable,isNew) {
  this.isNew=isNew;
  this.virtualTableFieldsList=null;
  this.modalVirtualTableFieldsConstraintDto=new VirtualTableFieldsConstraintDto();
  if(!isNew)
  {
    this.modalVirtualTableFieldsConstraintDto.virtualTable=virtualTable;
    // this.getFieldsByTableId(virtualTable.id);
    // this.getConstraintsByTableId(virtualTable.id);
  }
  else
  this.modalVirtualTableFieldsConstraintDto.virtualTable=new VirtualTable();
  this.modalReference=this.modalService.open(content,{ size: 'lg', backdrop: 'static' });
  
  this.modalReference.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
  this.changeDetector.detectChanges();
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

//#endregion

//#region Event listeners
OnClickSubmit(){
  this.update();
}
//#endregion


}
