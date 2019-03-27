import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import { GlobalData } from '../configuration';
import { WorkflowTrackMaster } from '../../model/workflow-track-master';
import { WorkflowStage } from '../../model/workflow-stage.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class WorkflowService {
 


  private workflowUrl:string = '';
  private workflowNodeUrl:string = '';
  private workflowLinkUrl:string = '';
  private workflowRunUrl:string = '';
  private workflowRunDetUrl:string = '';

  constructor(private http:HttpClient,private _configuration: GlobalData) { 
    

    this.workflowUrl =  'workflow/workflows';
    this.workflowLinkUrl = 'workflowLink/workflowLinks';
    this.workflowNodeUrl =  'workflowNode/workflowNodes';
    this.workflowRunUrl =  'workflowTrackMaster/workflowTrackMasters';
    this.workflowRunDetUrl =  'workflowTrackDet/workflowTrackDets';
  }
 
  //#region workflow
  public createWorkflow(workflow) {
    return this.http.post(this.workflowUrl,workflow);
  }
  public createWorkflowDesign(workflow) {
    return this.http.post(this.workflowUrl+"/design",workflow);
  }
  public getAllWorkflow(): Observable<any> {
    return this.http.get(this.workflowUrl);
  }
  public getAllWorkflowByProcess(processId:number): Observable<any> {
    return this.http.get(this.workflowUrl+"/process/"+processId);
  }
  public getAllPublishedWorkflow(): Observable<any> {
    return this.http.get(this.workflowUrl+"/published");
  }
  public getOneWorkflow(workflow): Observable<any> {
    return this.http.get(this.workflowUrl+ "/"+ workflow.id);
  }

  public deleteWorkflow(workflow) {
    return this.http.delete(this.workflowUrl + "/"+ workflow.id);
  }
  public updateWorkflow(workflow) {
    return this.http.put(this.workflowUrl,workflow);
  }
  public publishWorkflow(workflow) {
    return this.http.put(this.workflowUrl+ "/publish",workflow);
  }
  //#endregion

  //#region workflowNode
  public createWorkflowNode(workflowNode) {
    return this.http.post(this.workflowNodeUrl,workflowNode);
  }
  public createAllWorkflowNode(workflow) {
    return this.http.post(this.workflowNodeUrl+"/all",workflow);
  }
  public getAllWorkflowNode(): Observable<any> {
    return this.http.get(this.workflowNodeUrl);
  }
  public getAllWorkflowNodeByWorkflow(workflowId): Observable<any> {
    return this.http.get(this.workflowNodeUrl+"/workflow/"+workflowId);
  }
  
  public getOneWorkflowNode(workflowNode): Observable<any> {
    return this.http.get(this.workflowNodeUrl+ "/"+ workflowNode.id);
  }

  public deleteWorkflowNode(workflowNode) {
    return this.http.delete(this.workflowNodeUrl + "/"+ workflowNode.id);
  }
  public updateWorkflowNode(workflowNode) {
    return this.http.put(this.workflowNodeUrl,workflowNode);
  }
  //#endregion

  //#region workflowLink
  public createWorkflowLink(workflowLink) {
    return this.http.post(this.workflowLinkUrl,workflowLink);
  }
  public createAllWorkflowLink(workflowLinks) {
    return this.http.post(this.workflowLinkUrl+"/all",workflowLinks);
  }
  
  public getAllWorkflowLink(): Observable<any> {
    return this.http.get(this.workflowLinkUrl);
  }
  public getAllWorkflowLinkByWorkflow(workflowId): Observable<any> {
    return this.http.get(this.workflowLinkUrl+"/workflow/"+workflowId);
  }
  
  public getOneWorkflowLink(workflowNode): Observable<any> {
    return this.http.get(this.workflowLinkUrl+ "/"+ workflowNode.id);
  }

  public deleteWorkflowLink(workflowNode) {
    return this.http.delete(this.workflowLinkUrl + "/"+ workflowNode.id);
  }
  public updateWorkflowLink(workflowNode) {
    return this.http.put(this.workflowLinkUrl,workflowNode);
  }
  //#endregion

  //#region workflowExecution

   public getAllOpenWorkflow(): Observable<any> {
    return this.http.get(this.workflowRunUrl+"/openWorkflows");
  }
  public runWorkflow(workflowStage:WorkflowStage): Observable<any>  {
    return this.http.post(this.workflowRunUrl+"/execute",workflowStage);
  }
  public submitActionWorkflow(workflowStage:WorkflowStage): Observable<any>  {
    return this.http.post(this.workflowRunUrl+"/action",workflowStage);
  }
  //#endregion workflowExcecution
//#region workflow track det
public getAllWorkflowTrackDetByUser(): Observable<any> {
  return this.http.get(this.workflowRunDetUrl+"/user");
}
//#endregion workflow track det
}
