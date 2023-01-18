import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebuiltCarousalItemComponent } from './prebuilt-carousal-item.component';

describe('PrebuiltCarousalItemComponent', () => {
  let component: PrebuiltCarousalItemComponent;
  let fixture: ComponentFixture<PrebuiltCarousalItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrebuiltCarousalItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebuiltCarousalItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
