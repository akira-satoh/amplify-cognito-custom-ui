import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdpComponent } from './idp.component';
import { TranslateModule } from '@ngx-translate/core';
import { AmplifyService } from 'aws-amplify-angular';
import { NEBULAR_MODULES } from '../auth.module';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

describe('IdpComponent', () => {
  let component: IdpComponent;
  let fixture: ComponentFixture<IdpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        TranslateModule.forRoot(),
        RouterTestingModule,
        ...NEBULAR_MODULES
      ],
      declarations: [ IdpComponent ],
      providers: [AmplifyService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
