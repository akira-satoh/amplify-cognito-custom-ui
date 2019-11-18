import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthPagesChildComponent } from './auth-pages-child.component';

describe('AuthPagesChildComponent', () => {
  let component: AuthPagesChildComponent;
  let fixture: ComponentFixture<AuthPagesChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthPagesChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthPagesChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
