import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XtractWorksComponent } from './xtract-works.component';

describe('XtractWorksComponent', () => {
  let component: XtractWorksComponent;
  let fixture: ComponentFixture<XtractWorksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XtractWorksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XtractWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
