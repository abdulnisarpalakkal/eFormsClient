import {VirtualTable} from './virtual-table.model';
import { FormDesign } from './form-design.model';
import { UserRoles } from './user-roles.model';
import { VirtualRowRecordsDto } from './virtual-row-records-dto.model';

export class FormMaster {
        public  id: number;
      
        public formName: string;
        public formDesc: string;
        public virtualTableMaster: VirtualTable;
        public formDesignList:FormDesign[];
        public accessGroups:UserRoles[];
        public virtualRowRecordsDto:VirtualRowRecordsDto;
  }