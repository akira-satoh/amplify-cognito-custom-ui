import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonAllowComponent } from './anon-allow.component';

describe('AnonAllowComponent', () => {
  let component: AnonAllowComponent;
  let fixture: ComponentFixture<AnonAllowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonAllowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonAllowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
