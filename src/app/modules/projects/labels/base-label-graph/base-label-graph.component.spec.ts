import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseLabelGraphComponent } from './base-label-graph.component';

describe('BaseLabelGraphComponent', () => {
  let component: BaseLabelGraphComponent;
  let fixture: ComponentFixture<BaseLabelGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseLabelGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLabelGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
