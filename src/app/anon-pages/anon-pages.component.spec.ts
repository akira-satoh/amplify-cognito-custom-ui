import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonPagesComponent } from './anon-pages.component';

describe('AnonPagesComponent', () => {
  let component: AnonPagesComponent;
  let fixture: ComponentFixture<AnonPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnonPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnonPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
