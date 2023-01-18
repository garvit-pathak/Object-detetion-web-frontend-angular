import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebuiltCanvasComponent } from './prebuilt-canvas.component';

describe('PrebuiltCanvasComponent', () => {
  let component: PrebuiltCanvasComponent;
  let fixture: ComponentFixture<PrebuiltCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrebuiltCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebuiltCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
