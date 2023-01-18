import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XtractUsecasesComponent } from './xtract-usecases.component';

describe('XtractUsecasesComponent', () => {
  let component: XtractUsecasesComponent;
  let fixture: ComponentFixture<XtractUsecasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XtractUsecasesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XtractUsecasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
