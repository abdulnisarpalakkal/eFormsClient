import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualTableRecordComponent } from './virtual-table-record.component';

describe('VirtualTableRecordComponent', () => {
  let component: VirtualTableRecordComponent;
  let fixture: ComponentFixture<VirtualTableRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirtualTableRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualTableRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
