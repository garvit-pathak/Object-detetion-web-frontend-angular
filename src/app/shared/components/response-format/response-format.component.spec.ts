import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseFormatComponent } from './response-format.component';

describe('ResponseFormatComponent', () => {
  let component: ResponseFormatComponent;
  let fixture: ComponentFixture<ResponseFormatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponseFormatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
