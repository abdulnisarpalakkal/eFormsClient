import { Component, OnInit,ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {DatatableComponent} from '@swimlane/ngx-datatable';

import { routerTransition } from '../../../router.animations';
import {ProcessService,CategoryService,Handler} from '../../../shared';
import {Process} from '../../../model/process.model';
import {Category} from '../../../model/category.model';


@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss'],
  animations: [routerTransition()]
})
export class ProcessComponent implements OnInit {

  processes=[];
  temp = [];
  modalProcess: Process;
  public filter_Process: Process;
  public _filter_categoryId:number;
  categories:Array<Category>=[];

 
  closeResult: string;
  modalReference: any;
  
  processForm;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private processService: ProcessService,private categoryService: CategoryService
    ,private modalService: NgbModal, private handler:Handler) { }

  ngOnInit() {
      this.getProcesses();
      this.getCategories();
      this.filter_Process=new Process();
      this.modalProcess=new Process();
      this._filter_categoryId=0;
  }
  getProcesses() {
      this.processService.get()
      .subscribe(
            data => {
              this.temp = [...data];
              this.processes=data;    
            },
            error=>{
            }
      );
  }
  public  getCategories() {
    this.categoryService.get()
    .subscribe(
          data => {
            this.categories= data;    
          },
          error=>{
            this.categories=null;
          }
    );
}
  updateFilter(event) {
    const processName =  this.filter_Process.processName?this.filter_Process.processName.toLowerCase():"";
    const categoryId=this._filter_categoryId?+this._filter_categoryId:0;
    var valid=false;
    // filter our data
    const temp = this.temp.filter(function(d) {
        valid= d.processName.toLowerCase().indexOf(processName) !== -1 || !processName;
        valid= valid && (d.category.id==categoryId || !categoryId    );
        
        return valid;
    });
    // update the rows
    this.processes = temp;      
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
}
deleteUser(process:Process){
    if(!confirm("Are you sure to delete "+process.processName)) {
        return;
    }
    this.processService.delete(process)
    .subscribe(
        data => {
          this.getProcesses();
         
        },
        error=>{
            this.getProcesses();
        }
    );
}
open(content,process,isNew) {
    if(!isNew)
      this.modalProcess=process;
    else
      this.modalProcess=new Process();
    this.modalReference=this.modalService.open(content);
    
    this.modalReference.result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        this.getProcesses();
    }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.getProcesses();
    });
}
closeModal() {
    this.modalReference.close();
    this.getProcesses();

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
onUpdated(process: Process) {
  this.closeModal();
}

}
