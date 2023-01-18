import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressDropdownComponent } from './address-dropdown.component';

describe('AddressDropdownComponent', () => {
  let component: AddressDropdownComponent;
  let fixture: ComponentFixture<AddressDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
