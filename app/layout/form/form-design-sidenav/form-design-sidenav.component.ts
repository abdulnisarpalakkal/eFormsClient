import { Component, OnInit,AfterViewInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
// import { SidenavComponent } from 'ng-uikit-pro-standard';
import { FormMaster } from '../../../model/form-master.model';
import { VirtualTableFields } from '../../../model/virtual-table-fields.model';

@Component({
  selector: 'app-form-design-sidenav',
  templateUrl: './form-design-sidenav.component.html',
  styleUrls: ['./form-design-sidenav.component.scss']
})
export class FormDesignSidenavComponent implements OnInit,AfterViewInit {
  @Input() designform:FormMaster;
  @Input() virtualTableFieldsList: VirtualTableFields[]=[];
  @Output() autoGenerateComponentsEmit=new EventEmitter<any>();
  @Output() createNewComponentEmit=new EventEmitter<any>();

  // @ViewChild('sidenavformdesign', {static: false}) sidenavformdesign: SidenavComponent;

  constructor() { }
  
  ngOnInit() {
   
  }
  ngAfterViewInit(): void {
    // this.sidenavformdesign.show();
  }
  autoGenerateComponents(){
    this.autoGenerateComponentsEmit.emit();
  }
  createNewComponent(){
    this.createNewComponentEmit.emit();
  }
}
