import { Pipe, PipeTransform } from '@angular/core';
import { VirtualTableConstraints } from '../../model/virtual-table-constraints.model';
import { VirtualTable } from '../../model/virtual-table.model';

@Pipe({
  name: 'refFieldFilter'
})
export class RefFieldFilterPipe implements PipeTransform {

  transform(pkeyRefConstraints: VirtualTableConstraints[], virtualTableName: String): any {
    if(!pkeyRefConstraints || !virtualTableName){
      return pkeyRefConstraints;
    }
    return pkeyRefConstraints.filter(pkey=>pkey.virtualTableField.virtualTableMaster.tableName==virtualTableName);
  }

}
