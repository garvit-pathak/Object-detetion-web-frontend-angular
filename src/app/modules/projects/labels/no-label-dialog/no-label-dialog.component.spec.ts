import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoLabelDialogComponent } from './no-label-dialog.component';

describe('NoLabelDialogComponent', () => {
  let component: NoLabelDialogComponent;
  let fixture: ComponentFixture<NoLabelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoLabelDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoLabelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
