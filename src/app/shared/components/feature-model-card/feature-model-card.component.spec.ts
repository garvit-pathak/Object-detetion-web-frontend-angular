import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureModelCardComponent } from './feature-model-card.component';

describe('FeatureModelCardComponent', () => {
  let component: FeatureModelCardComponent;
  let fixture: ComponentFixture<FeatureModelCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureModelCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeatureModelCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
