import {VirtualTable} from './virtual-table.model';
import {VirtualTableConstraints} from './virtual-table-constraints.model';
export class VirtualTableFields {
        public  id: number;
      
        public fieldName: string;
        public fieldDataType: string;
        public fieldDesc: string;
        public deleted:boolean;
        public virtualTableMaster: VirtualTable;
        public fieldConstraintList:VirtualTableConstraints[];
        
        
  }