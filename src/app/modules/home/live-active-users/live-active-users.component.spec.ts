import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveActiveUsersComponent } from './live-active-users.component';

describe('LiveActiveUsersComponent', () => {
  let component: LiveActiveUsersComponent;
  let fixture: ComponentFixture<LiveActiveUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiveActiveUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveActiveUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
