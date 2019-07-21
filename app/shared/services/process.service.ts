import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

import { Process } from '../../model/process.model';
import { GlobalData } from '../configuration';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class ProcessService {
  private processUrl:string = '';

  constructor(private http:HttpClient,private _configuration: GlobalData) { 
    this.processUrl = 'process';
  }
  
  
  public create(process) {
    return this.http.post(this.processUrl,process);
  }
 
  public get(): Observable<any> {
    console.log(this.processUrl);
    return this.http.get(this.processUrl);
  }

  public delete(process) {
    return this.http.delete(this.processUrl + "/"+ process.id);
  }
  public update(process) {
    return this.http.put(this.processUrl,process);
  }


}
