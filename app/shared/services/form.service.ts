import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

import { GlobalData } from '../configuration';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class FormService {
  private formUrl:string = '';
  private formDesignUrl:string = '';
  private formRuleTypeUrl:string = '';
  private formRuleUrl:string = '';

  constructor(private http:HttpClient,private _configuration: GlobalData) { 
    this.formUrl =  'formMaster';
    this.formDesignUrl = 'formDesign';
    this.formRuleTypeUrl = 'formRuleType/formRuleTypes';
    this.formRuleUrl = 'formRule/formRules';
    
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
  public getOne(formId:number): Observable<any> {
    return this.http.get(this.formUrl+ "/"+ formId);
  }

  public delete(formMaster) {
    return this.http.delete(this.formUrl + "/"+ formMaster.id);
  }
  public update(formMaster) {
    return this.http.put(this.formUrl,formMaster);
  }
  public updateDesign(formDesignDto) {
    return this.http.put(this.formUrl+"/design",formDesignDto);
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
  public getAllFormComponentsByFormId(formId): Observable<any> {
    return this.http.get(this.formDesignUrl+ "/components/form/"+ formId);
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
  //#region formRuleType
  public getFormRuleTypes(): Observable<any> {
    return this.http.get(this.formRuleTypeUrl);
  }
  //#endregion
  //#region formRuleType
  public getFormRules(): Observable<any> {
    return this.http.get(this.formRuleUrl);
  }
  //#endregion

}
