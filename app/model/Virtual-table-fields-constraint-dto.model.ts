import {VirtualTable} from './virtual-table.model';
import { VirtualTableFields } from './virtual-table-fields.model';
import { VirtualTableConstraints } from './virtual-table-constraints.model';
export class VirtualTableFieldsConstraintDto{
    virtualTable:VirtualTable;
    virtualTableFields:VirtualTableFields[]=[];
    fkConstraints:VirtualTableConstraints[]=[];
    pkConstraint:VirtualTableConstraints;
}