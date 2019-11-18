import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { I18n } from 'aws-amplify';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'amplify-cognito';

  constructor(translate: TranslateService, authService: AuthService) {
    translate.setDefaultLang('en');
    translate.use(window.navigator.language);
    translate.onLangChange.subscribe(result => {
      console.log(result);
      I18n.putVocabulariesForLanguage(result.lang, result.translations);
    }, err => {
      console.error(err);
    })
    // I18n.putVocabulariesForLanguage('')
  }
}
