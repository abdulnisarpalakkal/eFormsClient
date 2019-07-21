import { Component, OnInit, Input } from '@angular/core';
import { FormDesign } from '../../../model/form-design.model';
import { FormComponentEnum } from '../../../model/form-component.enum';
import {DomSanitizer} from '@angular/platform-browser';
import {FileService} from './../../services';

@Component({
  selector: 'app-form-design',
  templateUrl: './form-design.component.html',
  styleUrls: ['./form-design.component.scss']
})
export class FormDesignComponent implements OnInit {
  @Input() formDesign:FormDesign;
  @Input() isFormForExecution:boolean=false;
  @Input() isDisableComponent:boolean=false;

  selectComponent:FormComponentEnum=FormComponentEnum.COMPO;
  labelComponent:FormComponentEnum=FormComponentEnum.LABEL;
  radioComponent:FormComponentEnum=FormComponentEnum.RADIO;
  checkComponent:FormComponentEnum=FormComponentEnum.CHECKBOX;
  dateComponent:FormComponentEnum=FormComponentEnum.DATE;
  fileUploadComponent:FormComponentEnum=FormComponentEnum.FILE;
  imgComponent:FormComponentEnum=FormComponentEnum.IMG;
  private readonly imageType : string = 'data:image/PNG;base64,';
  prevFileName:string;
  constructor(private _DomSanitizationService: DomSanitizer,private fileService:FileService) { }

  ngOnInit() {
  }
  getImageFromString(imageString:string){
    return this._DomSanitizationService.bypassSecurityTrustUrl(this.imageType + imageString);
  }
  public fileChangeEvent(fileInput: any){
    if (fileInput.target.files && fileInput.target.files[0]) {
      var uploadFile:File=fileInput.target.files[0];
      if(this.isFormForExecution){
        this.fileService.uploadFile(uploadFile,this.prevFileName).subscribe(data=>{
          this.formDesign.formComponent.componentValue=uploadFile.name;
          this.prevFileName=uploadFile.name;
        },error=>{
          
        });
      }
    }
  }
}
