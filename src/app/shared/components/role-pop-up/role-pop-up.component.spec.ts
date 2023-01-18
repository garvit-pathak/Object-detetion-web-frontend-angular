import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolePopUpComponent } from './role-pop-up.component';

describe('RolePopUpComponent', () => {
  let component: RolePopUpComponent;
  let fixture: ComponentFixture<RolePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolePopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
