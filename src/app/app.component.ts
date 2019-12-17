import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18n } from 'aws-amplify';
import { AuthService } from './auth/services/auth.service';
import awsconfig from '../aws-exports';
import { environment } from 'src/environments/environment';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'amplify-cognito-custom-ui';

  menuItems: NbMenuItem[];

  constructor(translate: TranslateService, public authService: AuthService) {
    translate.setDefaultLang('en');
    translate.use(window.navigator.language);
    translate.onLangChange.subscribe(result => {
      console.debug(result);
      I18n.putVocabulariesForLanguage(result.lang, result.translations);
    }, err => {
      console.error(err);
    })
    // I18n.putVocabulariesForLanguage('')

    this.menuItems  = [
      {
        title: translate.instant('Home'),
        home: true,
        icon: 'home',
        url: '/'
      },
      {
        title: translate.instant('Sign in'),
        link: 'auth/signin',
        icon: 'log-in-outline'
      },
      {
        title: translate.instant('Sign up'),
        link: 'auth/signup',
        icon: 'people'
      },
      {
        title: translate.instant('Sign out'),
        link: 'auth/signout',
        icon: 'log-out-outline'
      },
      {
        title: translate.instant('Anonymouse Allow'),
        link: 'anon-allow',
        icon: 'unlock-outline'
      },
      {
        title: translate.instant('Auth Allow'),
        link: 'auth-allow-a',
        icon: 'lock-outline'
      },
      {
        title: translate.instant('Anonymouse Allow'),
        link: 'anon-pages',
        icon: 'unlock-outline'
      },
      {
        title: translate.instant('Auth Allow'),
        link: 'auth-pages',
        icon: 'lock-outline'
      },
    ]
  }
}
