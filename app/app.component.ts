import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MessageService } from './shared';
import { Subscription } from 'rxjs';
import { UserMsg } from './model/user-msg.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,OnDestroy {
    subscription: Subscription;
    msgOb: UserMsg=new UserMsg();
    constructor(private ref: ChangeDetectorRef,private messageService:MessageService) {
    }

    ngOnInit() {
        this.subscription=this.messageService.getMessage().subscribe(message=>{
            if(message){
                this.msgOb=message;
                this.ref.detectChanges();
                if(this.msgOb.success)
                    setTimeout(() => {
                        this.msgOb=null;
                        this.ref.detectChanges();
                    }, 2000);
            }
            else{

                this.msgOb=null;
            }
        });
    }
    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
    deleteMsg(){
        this.msgOb=null;
        this.ref.detectChanges();
    }
}
