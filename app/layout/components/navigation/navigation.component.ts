import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TokenStorage } from '../../../shared';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @ViewChild('sidenav', {static: false}) sidenav: ElementRef;

  clicked: boolean;

  constructor(private token: TokenStorage) {
    this.clicked = this.clicked === undefined ? false : true;
  }

  ngOnInit() {
    
  }

  setClicked(val: boolean): void {
    this.clicked = val;
  }
  onLoggedout() {
    // localStorage.removeItem('isLoggedin');
    this.token.signOut();
}
}
