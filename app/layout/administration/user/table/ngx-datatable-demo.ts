import { Component,ViewEncapsulation  } from '@angular/core';

@Component({
  selector: 'ngx-datatable-demo',
  templateUrl: './ngx-datatable-demo.html',
  // template: `
  //   <div>
     
      
  //     <ngx-datatable class="bootstrap"
  //     [rows]="rows"
  //     [columns]="[{name:'Name'},{name:'Gender'},{name:'Company'}]"
  //     [columnMode]="'force'"
  //     [headerHeight]="50"
  //     [footerHeight]="50"
  //     [rowHeight]= "'auto'"
  //     [limit]="10">
  //   </ngx-datatable>
  //   </div>
  // `,
  
    encapsulation: ViewEncapsulation.None
})
export class NgxDatatableComponent {

  rows = [];
  columns = [
    { prop: 'name' },
    { name: 'Company' },
    { name: 'Gender' }
  ];

  constructor() {
    this.fetch((data) => {
      this.rows = data;
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
      // const rows = JSON.parse(req.response);
      // cb(rows.splice(0, 50));
    };

    req.send();
  }
  getRowClass(row) {
    return {
      'age-is-ten': (row.age % 10) === 0
    };
  }

  getCellClass({ row, column, value }): any {
    return {
      'is-female': value === 'female'
    };
  }

}