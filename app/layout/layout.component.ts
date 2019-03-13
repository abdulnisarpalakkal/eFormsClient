import { Component, OnInit, OnDestroy, AfterViewInit,ViewChild, ViewEncapsulation,ChangeDetectorRef } from '@angular/core';
import {MessageService} from './../shared';
import { Subscription } from 'rxjs';
import { UserMsg } from '../model/user-msg.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-layout',
    // encapsulation: ViewEncapsulation.None,
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit,OnDestroy,AfterViewInit  {
    subscription: Subscription;
    msgOb: UserMsg=new UserMsg();

    @ViewChild("msgContent") msgContent: any;
    modalReference: any;
    constructor(private ref: ChangeDetectorRef,private messageService:MessageService,private modalService: NgbModal) {
      
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
    ngAfterViewInit(){
     
    }
    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
    deleteMsg(){
        this.msgOb=null;
        this.ref.detectChanges();
    }
}
