import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebuiltHomeComponent } from './prebuilt-home.component';

describe('PrebuiltHomeComponent', () => {
  let component: PrebuiltHomeComponent;
  let fixture: ComponentFixture<PrebuiltHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrebuiltHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebuiltHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
