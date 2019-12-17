import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPasswordComponent } from './request-password.component';
import { NbAlertModule, NbCardModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { NEBULAR_MODULES } from '../auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmplifyService } from 'aws-amplify-angular';
import { CommonModule } from '@angular/common';

describe('RequestPasswordComponent', () => {
  let component: RequestPasswordComponent;
  let fixture: ComponentFixture<RequestPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        ...NEBULAR_MODULES
      ],
      declarations: [ RequestPasswordComponent ],
      providers: [AmplifyService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
