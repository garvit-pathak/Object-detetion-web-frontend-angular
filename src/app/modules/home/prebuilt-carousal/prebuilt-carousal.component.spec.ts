import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebuiltCarousalComponent } from './prebuilt-carousal.component';

describe('PrebuiltCarousalComponent', () => {
  let component: PrebuiltCarousalComponent;
  let fixture: ComponentFixture<PrebuiltCarousalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrebuiltCarousalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebuiltCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
