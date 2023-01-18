import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorLabelListComponent } from './color-label-list.component';

describe('ColorLabelListComponent', () => {
  let component: ColorLabelListComponent;
  let fixture: ComponentFixture<ColorLabelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorLabelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorLabelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
