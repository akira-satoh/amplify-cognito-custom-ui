import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoutComponent } from './signout.component';
import { NbAlertModule } from '@nebular/theme';
import { RouterTestingModule } from '@angular/router/testing';
import { NEBULAR_MODULES } from '../auth.module';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

describe('SignoutComponent', () => {
  let component: SignoutComponent;
  let fixture: ComponentFixture<SignoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        CommonModule,
        RouterTestingModule,
        ...NEBULAR_MODULES,
      ],
      declarations: [ SignoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
