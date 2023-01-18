import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessCountsComponent } from './process-counts.component';

describe('ProcessCountsComponent', () => {
  let component: ProcessCountsComponent;
  let fixture: ComponentFixture<ProcessCountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessCountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
