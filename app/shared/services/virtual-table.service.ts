import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import { Process } from '../../model/process.model';
import { GlobalData } from '../configuration';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class VirtualTableService {
  private virtualTableUrl:string = '';
  private virtualTableFieldUrl:string = '';
  private virtualTableConstraintUrl:string = '';

  constructor(private http:HttpClient,private _configuration: GlobalData) { 
    this.virtualTableUrl =  'virtualTableMaster';
    this.virtualTableFieldUrl = 'virtualTableFields';
    this.virtualTableConstraintUrl =  'virtualTableConstraints';
  }
  
  //#region virtualTableMaster
 
  public create(virtualTableFieldsConstraintDto) {
    return this.http.post(this.virtualTableUrl,virtualTableFieldsConstraintDto);
  }
 
  public get(): Observable<any> {
    return this.http.get(this.virtualTableUrl);
  }
  public getOne(virtualTable): Observable<any> {
    return this.http.get(this.virtualTableUrl+ "/"+ virtualTable.id);
  }

  public delete(virtualTable) {
    return this.http.delete(this.virtualTableUrl + "/"+ virtualTable.id);
  }
  public update(virtualTable) {
    return this.http.put(this.virtualTableUrl,virtualTable);
  }
  public getConstraintRefDataByProcessId(processId): Observable<any> {
    return this.http.get(this.virtualTableUrl+ "/constraintRef/"+ processId);
  }
 //#endregion

 //#region virtualTableFields
 
 public createTableFields(virtualTableFields) {
  return this.http.post(this.virtualTableFieldUrl,virtualTableFields);
}

public getTableFields(): Observable<any> {
  return this.http.get(this.virtualTableFieldUrl);
}
public getTableFieldsByTable(tableId): Observable<any> {
  return this.http.get(this.virtualTableFieldUrl+"/table/"+tableId);
}

public deleteTableFields(virtualTableField) {
  return this.http.delete(this.virtualTableFieldUrl + "/"+ virtualTableField.id);
}
public updateTableFields(virtualTableField) {
  return this.http.put(this.virtualTableFieldUrl,virtualTableField);
}

//#endregion

//#region Constraints
public getTableConstraintsByTable(tableId): Observable<any> {
  return this.http.get(this.virtualTableConstraintUrl+"/table/"+tableId);
}


//#endregion
public getTableFieldTypes(): Observable<any> {
  return this.http.get(this.virtualTableFieldUrl+'/types');
}

}
