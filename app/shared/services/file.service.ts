import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class FileService {
  private fileApiUrl:string = '';
  constructor(private http:HttpClient) { 
    this.fileApiUrl = 'file/files';
  }
  
  public uploadFile(file:File,prevFileName:string): Observable<any>  {
    const formData: FormData = new FormData();
    formData.append("file", file);
    formData.append("prevFileName", prevFileName);
    return this.http.post(this.fileApiUrl,formData);
  }
  public deleteFile(fileName:string): Observable<any>  {
    return this.http.delete(this.fileApiUrl+"/"+fileName);
  }

}
