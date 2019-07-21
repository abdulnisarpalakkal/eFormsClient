import { Component, OnInit, OnDestroy, AfterViewInit,ViewChild, ViewEncapsulation,ChangeDetectorRef } from '@angular/core';
import {MessageService} from './../shared';
import { Subscription } from 'rxjs';
import { UserMsg } from '../model/user-msg.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-layout',
    // encapsulation: ViewEncapsulation.None,
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit,OnDestroy,AfterViewInit  {
    subscription: Subscription;
    msgOb: UserMsg=new UserMsg();
    specialPage: boolean=true;
    @ViewChild("msgContent", {static: false}) msgContent: any;
    modalReference: any;
    private currentUrl = '';
    private specialPages: any[] = [
        '/forms/form-design',
        '/workflows/workflow-design'
       
      ];

    constructor(private ref: ChangeDetectorRef,
        private messageService:MessageService,
        private modalService: NgbModal,
        private router: Router,
        private location: Location
    ) {
        this.router.events.subscribe((route: any) => {
            if (route.routerEvent) {
              this.currentUrl = route.routerEvent.url;
            } else {
              this.currentUrl = route.url;
            }
            this.specialPage = false;
            if(this.currentUrl){
                const splitUrlArray=this.currentUrl.split("/");
                var concatenatedUrlPart="";
                for(var i=1;i<splitUrlArray.length;i++){
                    concatenatedUrlPart+="/"+splitUrlArray[i];
                    if(this.specialPages.indexOf(concatenatedUrlPart)!=-1){
                        this.specialPage=true;
                        break;
                    }
                }
                               
            }
          });
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
    goBack(): void {
        this.location.back();
      }
}
