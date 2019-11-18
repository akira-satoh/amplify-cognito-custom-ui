import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAllowComponent } from './auth-allow.component';

describe('AuthAllowComponent', () => {
  let component: AuthAllowComponent;
  let fixture: ComponentFixture<AuthAllowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthAllowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthAllowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
