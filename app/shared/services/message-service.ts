import { Subject, Observable } from "rxjs";
import { UserMsg } from "../../model/user-msg.model";

export class MessageService{
    private subject = new Subject<UserMsg>();
    sendMessage(message:UserMsg){
        this.subject.next(message);
    }
    clearMessages(){
        this.subject.next();
    }
    getMessage():Observable<UserMsg>{
        return this.subject.asObservable();
    }
}