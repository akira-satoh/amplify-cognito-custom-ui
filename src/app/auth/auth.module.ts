import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SignoutComponent } from './signout/signout.component';
import { NbThemeModule, NbLayoutModule, NbAlertModule, NbInputModule, NbCheckboxModule, NbButtonModule, NbTooltipModule, NbIconModule, NbToastrModule, NbCardModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAuthModule, NbAuthService } from '@nebular/auth';
import { TranslateModule } from '@ngx-translate/core';
import { RequestPasswordComponent } from './request-password/request-password.component';

//Nebular modules
const NEBULAR_MODULES = [
  NbAuthModule.forRoot(),
  NbThemeModule,
  NbLayoutModule,
  NbEvaIconsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbInputModule,
  NbToastrModule.forRoot(),
  NbTooltipModule,
];

@NgModule({
  declarations: [
    AuthComponent,
    SigninComponent,
    SignupComponent,
    SignoutComponent,
    RequestPasswordComponent
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
