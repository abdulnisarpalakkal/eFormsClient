import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridPropertiesComponent } from './grid-properties.component';

describe('GridPropertiesComponent', () => {
  let component: GridPropertiesComponent;
  let fixture: ComponentFixture<GridPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
