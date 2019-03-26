import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import { Category } from '../../model/category.model';
import { GlobalData } from '../configuration';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class CategoryService {
  private apiUrl:string = '';
  constructor(private http:HttpClient,private _configuration: GlobalData) { 
    this.apiUrl = 'category/categories';
  }
  

  
  public create(category) {
    return this.http.post(this.apiUrl,category);
  }
 
  public get(): Observable<any> {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl);
  }

  public delete(category) {
    return this.http.delete(this.apiUrl + "/"+ category.id);
  }
  public update(category) {
    return this.http.put(this.apiUrl,category);
  }


}
