import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowTrackComponent } from './workflow-track.component';

describe('WorkflowTrackComponent', () => {
  let component: WorkflowTrackComponent;
  let fixture: ComponentFixture<WorkflowTrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowTrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
