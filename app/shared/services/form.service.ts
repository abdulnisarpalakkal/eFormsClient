import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import { GlobalData } from '../configuration';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class FormService {
  private formUrl:string = '';
  private formDesignUrl:string = '';

  constructor(private http:HttpClient,private _configuration: GlobalData) { 
    this.formUrl =  'formMaster';
    this.formDesignUrl = 'formDesign';
  }
  
  //#region formMaster
 
  public create(formMaster) {
    return this.http.post(this.formUrl,formMaster);
  }
 
  public get(): Observable<any> {
    return this.http.get(this.formUrl);
  }
  public getAllUnderProcess(processId): Observable<any> {
    return this.http.get(this.formUrl+"/process/"+processId);
  }
  public getOne(formMaster): Observable<any> {
    return this.http.get(this.formUrl+ "/"+ formMaster.id);
  }

  public delete(formMaster) {
    return this.http.delete(this.formUrl + "/"+ formMaster.id);
  }
  public update(formMaster) {
    return this.http.put(this.formUrl,formMaster);
  }
  public updateDesign(formDesigns) {
    return this.http.put(this.formUrl+"/design",formDesigns);
  }
 //#endregion

  //#region formDesign
  public createFormDesign(formDesign) {
    return this.http.post(this.formDesignUrl,formDesign);
  }
  public createFormDesignAll(formDesigns) {
    return this.http.post(this.formDesignUrl+ "/all",formDesigns);
  }

  public getAllFormDesign(): Observable<any> {
    return this.http.get(this.formDesignUrl);
  }
  public getAllFormDesignByFormId(formId): Observable<any> {
    return this.http.get(this.formDesignUrl+ "/form/"+ formId);
  }
  public getOneFormDesign(formDesign): Observable<any> {
    return this.http.get(this.formDesignUrl+ "/"+ formDesign.id);
  }

  public deleteFormDesign(formDesign) {
    return this.http.delete(this.formDesignUrl + "/"+ formDesign.id);
  }
  public updateFormDesign(formDesign) {
    return this.http.put(this.formDesignUrl,formDesign);
  }
  public getAllFormComponentTypes(): Observable<any> {
    return this.http.get(this.formDesignUrl+"/types");
  }
  //#endregion

}
