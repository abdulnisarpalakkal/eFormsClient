import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkflowDesignSidenavComponent } from './workflow-design-sidenav.component';

describe('WorkflowDesignSidenavComponent', () => {
  let component: WorkflowDesignSidenavComponent;
  let fixture: ComponentFixture<WorkflowDesignSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkflowDesignSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkflowDesignSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
