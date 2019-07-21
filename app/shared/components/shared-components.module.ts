import { MDBBootstrapModulesPro } from "ng-uikit-pro-standard";
import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { PanelComponent } from "./panel/panel.component";

@NgModule({
    imports: [
      CommonModule,
      MDBBootstrapModulesPro.forRoot(),
    ],
    declarations: [
   
      PanelComponent
     
    ],
    exports: [
      MDBBootstrapModulesPro,
      PanelComponent
    ],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
  })
  export class SharedComponentsModule { }