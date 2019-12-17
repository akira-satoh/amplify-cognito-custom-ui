import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, switchMap } from 'rxjs/operators';
import { empty } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-idp',
  templateUrl: './idp.component.html',
  styleUrls: ['./idp.component.scss']
})
export class IdpComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(param => {
        if (param.get('provider') === 'google') {
          this.authService.signInGoogle()
            .then(crendentials => {
              crendentials.sessionToken
            })
            .catch(reason => {
              console.error(reason)
            })
        } else if (param.get('provider') === 'facebook') {
          this.authService.signInFacebook()
        } else if (param.get('provider') === 'amazon') {
          this.authService.signInAmazon()
        } else if (param.get('provider') === 'cognito') {
          this.authService.signInCognito()
        } else {
          window.history.back()
        } 
        return empty()
      })
    ).subscribe();
  }

  signInGoogle() {
    this.authService.signInGoogle()
  }

}
