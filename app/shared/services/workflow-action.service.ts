import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import { GlobalData } from '../configuration';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class WorkflowActionService {
  private actionEventUrl:string = '';
  private actionEventObjectUrl:string = '';
  private actionEventParamUrl:string = '';
  private actionEventParamObjectUrl:string = '';


  constructor(private http:HttpClient,private _configuration: GlobalData) { 
    this.actionEventUrl = _configuration.Server+ 'actionEvent/actionEvents';
    this.actionEventObjectUrl = _configuration.Server+ 'actionEventObject/actionEventObjects';
    this.actionEventParamUrl = _configuration.Server+ 'actionEventParam/actionEventParams';
    this.actionEventParamObjectUrl = _configuration.Server+ 'actionEventParamObject/actionEventParamObjects';

  }
  
  //#region Action Event
 
  public createEvent(event) {
    return this.http.post(this.actionEventUrl,event);
  }
 
  public getAllEvent(): Observable<any> {
    return this.http.get(this.actionEventUrl);
  }
  public getOneEvent(action): Observable<any> {
    return this.http.get(this.actionEventUrl+ "/"+ action.id);
  }

  public deleteEvent(action) {
    return this.http.delete(this.actionEventUrl + "/"+ action.id);
  }
  public updateEvent(action) {
    return this.http.put(this.actionEventUrl,action);
  }
 //#endregion
 

//#region Action Event Object
 
public createEventObject(eventObject) {
  return this.http.post(this.actionEventObjectUrl,eventObject);
}

public getAllEventObject(): Observable<any> {
  return this.http.get(this.actionEventObjectUrl);
}
public getOneEventObject(eventObject): Observable<any> {
  return this.http.get(this.actionEventObjectUrl+ "/"+ eventObject.id);
}

public deleteEventObject(eventObject) {
  return this.http.delete(this.actionEventObjectUrl + "/"+ eventObject.id);
}
public updateEventObject(eventObject) {
  return this.http.put(this.actionEventObjectUrl,eventObject);
}
//#endregion Action Event Object


//#region Action Event Param
 
public createEventParam(actionEventParam) {
  return this.http.post(this.actionEventParamUrl,actionEventParam);
}

public getAllEventParam(): Observable<any> {
  return this.http.get(this.actionEventParamUrl);
}
public getOneEventParam(actionEventParam): Observable<any> {
  return this.http.get(this.actionEventParamUrl+ "/"+ actionEventParam.id);
}

public deleteEventParam(actionEventParam) {
  return this.http.delete(this.actionEventParamUrl + "/"+ actionEventParam.id);
}
public updateEventParam(actionEventParam) {
  return this.http.put(this.actionEventParamUrl,actionEventParam);
}
//#endregion Action Event Param




//#region Action Event Param Object
 
public createEventParamObject(actionEventParamObj) {
  return this.http.post(this.actionEventParamObjectUrl,actionEventParamObj);
}

public getAllEventParamObject(): Observable<any> {
  return this.http.get(this.actionEventParamObjectUrl);
}
public getOneEventParamObject(actionEventParamObj): Observable<any> {
  return this.http.get(this.actionEventParamObjectUrl+ "/"+ actionEventParamObj.id);
}

public deleteEventParamObject(actionEventParamObj) {
  return this.http.delete(this.actionEventParamObjectUrl + "/"+ actionEventParamObj.id);
}
public updateEventParamObject(actionEventParam) {
  return this.http.put(this.actionEventParamObjectUrl,actionEventParam);
}
//#endregion Action Event Param Object


}
