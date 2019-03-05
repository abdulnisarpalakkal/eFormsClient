import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
  animations: [routerTransition()]
})
export class AdministrationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
