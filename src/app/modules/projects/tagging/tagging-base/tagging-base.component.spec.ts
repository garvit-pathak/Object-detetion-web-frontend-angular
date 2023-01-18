import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggingBaseComponent } from './tagging-base.component';

describe('TaggingBaseComponent', () => {
  let component: TaggingBaseComponent;
  let fixture: ComponentFixture<TaggingBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaggingBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaggingBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
