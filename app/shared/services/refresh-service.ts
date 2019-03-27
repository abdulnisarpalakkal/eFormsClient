import { Subject, Observable } from "rxjs";

export class RefreshService{
private subject = new Subject<string>();
//#region observables
 RefreshTrack(){
    this.subject.next();
  }
  getRefreshObservable():Observable<string>{
    return this.subject.asObservable();
  }
  //#endregion
}