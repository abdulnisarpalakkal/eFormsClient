import {VirtualTableConstraintType} from './virtual-table-constraints-type.model'
import {VirtualTableFields} from './virtual-table-fields.model';

export class VirtualTableConstraints {
    public  id: number;
      
    public constraintType: VirtualTableConstraintType;
    public constraintValue: String;
    public virtualTableField:VirtualTableFields;
    public foreignConstraint:VirtualTableConstraints;
    public deleted:boolean;
}