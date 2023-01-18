import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrebuiltModelListComponent } from './prebuilt-model-list.component';

describe('PrebuiltModelListComponent', () => {
  let component: PrebuiltModelListComponent;
  let fixture: ComponentFixture<PrebuiltModelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrebuiltModelListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrebuiltModelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
