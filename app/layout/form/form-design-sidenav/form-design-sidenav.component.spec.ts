import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDesignSidenavComponent } from './form-design-sidenav.component';

describe('FormDesignSidenavComponent', () => {
  let component: FormDesignSidenavComponent;
  let fixture: ComponentFixture<FormDesignSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDesignSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDesignSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
