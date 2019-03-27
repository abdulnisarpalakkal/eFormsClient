import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routerTransition } from './../../../../router.animations';

@Component({
  selector: 'app-process-submodule',
  templateUrl: './process-submodule.component.html',
  styleUrls: ['./process-submodule.component.scss'],
  animations:[routerTransition()]
})
export class ProcessSubmoduleComponent implements OnInit {
  processId:number;
  processName:String;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      this.processId=+params.get("id");
      this.processName=params.get("processName");
    });
  }

}
