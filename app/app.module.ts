import { NgModule,forwardRef, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient,HttpHandler,HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AuthGuard,Interceptor,TokenStorage,AdministrationService,CategoryService
    ,ProcessService,GlobalData,Handler,VirtualTableService,FormService,WorkflowService
    , WorkflowActionService,MessageService }
 from './shared';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule
    ],
    declarations: [AppComponent],
    providers: [
        AdministrationService,
             CategoryService,
             ProcessService,
             VirtualTableService,
             FormService,
             WorkflowService,
             WorkflowActionService,
             MessageService,
             AuthGuard,
             TokenStorage,
            {
                provide: HTTP_INTERCEPTORS,
                useClass: Interceptor,
                multi: true
            },
           
            GlobalData,
            Handler
            // ,
            // {
            //     provide:ErrorHandler,
            //     useClass:Handler
            // }
            
        
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
