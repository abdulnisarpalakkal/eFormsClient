import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowTrackMasterComponent } from './workflow-track-master.component';

describe('WorkflowTrackMasterComponent', () => {
  let component: WorkflowTrackMasterComponent;
  let fixture: ComponentFixture<WorkflowTrackMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowTrackMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowTrackMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
