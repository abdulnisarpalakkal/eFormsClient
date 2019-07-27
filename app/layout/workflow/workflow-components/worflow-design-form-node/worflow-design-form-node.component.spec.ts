import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorflowDesignFormNodeComponent } from './worflow-design-form-node.component';

describe('WorflowDesignFormNodeComponent', () => {
  let component: WorflowDesignFormNodeComponent;
  let fixture: ComponentFixture<WorflowDesignFormNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorflowDesignFormNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorflowDesignFormNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
