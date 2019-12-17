import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SignoutComponent } from './signout/signout.component';
import { NbThemeModule, NbLayoutModule, NbAlertModule, NbInputModule, NbCheckboxModule, NbButtonModule, NbTooltipModule, NbIconModule, NbToastrModule, NbCardModule, NbSpinnerModule, NbOverlayModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAuthModule, NbAuthService } from '@nebular/auth';
import { TranslateModule } from '@ngx-translate/core';
import { RequestPasswordComponent } from './request-password/request-password.component';
import { IdpComponent } from './idp/idp.component';

//Nebular modules
export const NEBULAR_MODULES = [
  NbThemeModule.forRoot(),
  NbAuthModule.forRoot(),
  NbLayoutModule,
  NbEvaIconsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbToastrModule.forRoot({ }),
  NbTooltipModule,
  NbSpinnerModule,
  NbOverlayModule.forRoot(),
];

@NgModule({
  declarations: [
    AuthComponent,
    SigninComponent,
    SignupComponent,
    SignoutComponent,
    RequestPasswordComponent,
    IdpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    AmplifyAngularModule,
    TranslateModule,
    ...NEBULAR_MODULES
  ],
  providers: [ AmplifyService ]
})
export class AuthModule { }
