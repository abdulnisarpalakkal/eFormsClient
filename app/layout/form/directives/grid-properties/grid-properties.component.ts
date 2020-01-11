import { Component, OnInit, Input } from '@angular/core';
import { FormDesign } from '../../../../model/form-design.model';
import { VirtualTableFields } from '../../../../model/virtual-table-fields.model';
import { FormRule } from '../../../../model/form-rule';
import { FormGrid } from '../../../../model/form-grid.model';
import { VirtualTable } from '../../../../model/virtual-table.model';

@Component({
  selector: 'app-grid-properties',
  templateUrl: './grid-properties.component.html'
  
})
export class GridPropertiesComponent implements OnInit {
  @Input() formDesign: FormDesign;
  @Input() virtualTableFieldsList: VirtualTableFields[]=[];
  @Input() virtualTablesReferringMe:VirtualTable[]=[];
  @Input() formRules:FormRule[]=[];
  constructor() { }

  ngOnInit() {
    if(this.formDesign==null){
      this.formDesign=new FormDesign();
      this.formDesign.formGrid=new FormGrid(); 
    }
  }

}
