import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbMenuModule, NbUserModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AnonAllowComponent } from './anon-allow/anon-allow.component';
import { AuthAllowComponent } from './auth-allow/auth-allow.component';

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const NEBULAR_MOBULES = [
  NbThemeModule.forRoot({ name: 'default' }),
  NbLayoutModule,
  NbEvaIconsModule,
  NbMenuModule.forRoot(),
  NbSidebarModule.forRoot(),
  NbUserModule,
]

@NgModule({
  declarations: [
    AppComponent,
    AnonAllowComponent,
    AuthAllowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ...NEBULAR_MOBULES
  ],
  providers: [AmplifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
