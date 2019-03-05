import {Process} from './process.model';
import {VirtualTableFields} from './virtual-table-fields.model';

export class VirtualTable {
        public  id: number;
      
        public tableName: string;
        public tableDesc: string;
        public process: Process;
        public autoIncr: boolean;
        virtualTableFieldsList: VirtualTableFields[]=[];
  }