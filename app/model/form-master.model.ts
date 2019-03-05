import {VirtualTable} from './virtual-table.model';
import { FormDesign } from './form-design.model';
import { UserRoles } from './user-roles.model';

export class FormMaster {
        public  id: number;
      
        public formName: string;
        public formDesc: string;
        public virtualTableMaster: VirtualTable;
        public formDesignList:FormDesign[];
        public accessGroups:UserRoles[];
  }