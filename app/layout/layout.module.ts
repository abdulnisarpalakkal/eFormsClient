import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule,NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavigationModule } from './components/navigation/navigation.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { HeaderComponent } from './components/header/header.component';
import {  MDBBootstrapModulesPro} from 'ng-uikit-pro-standard';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        NgbModule,
        NavigationModule,
        MDBBootstrapModulesPro.forRoot()
      
    ],
    declarations: [LayoutComponent, HeaderComponent,FooterComponent,SidebarComponent]
    
})
export class LayoutModule {}
