import { Component, ViewChild } from '@angular/core'
import { NbAuthSocialLink } from '@nebular/auth'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Auth } from 'aws-amplify'
import { NbToastrService, NbFlipCardComponent } from '@nebular/theme'
import { AuthService } from '../services/auth.service'
import { TranslateService } from '@ngx-translate/core'
import { environment } from 'src/environments/environment'
import { Router, ActivatedRoute } from '@angular/router'
import { first } from 'rxjs/operators'
import { AuthValidators } from '../auth-validators'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  /** フォーム */
  form: FormGroup
  /** ユーザー名 */
  username: FormControl
  /** Email */
  email: FormControl
  /** 電話番号 */
  phoneNumber: FormControl
  /** パスワード */
  password: FormControl
  /** リメンバミー */
  confirmPassword: FormControl
  /** 確認コード */
  verifyCode: FormControl
  /** 規約に同意 */
  terms: FormControl
  /** 送信中 */
  submitted: boolean = false
  /** エラーメッセージ */
  errorMessage: string;
  /** ソーシャルリンク */
  socialLinks: NbAuthSocialLink[] = []

  @ViewChild('flipCard', { static: true })
  flipCard: NbFlipCardComponent

  /**
   * パスワード最小長
   */
  get passwordMinLength() {
    return environment.auth.passwordPolicy.minLength
  }

  constructor(fb: FormBuilder, private toastrService: NbToastrService,
    private authService: AuthService, private translateService: TranslateService,
    private router: Router, private route: ActivatedRoute) {
    //有効フィールド
    const availableFields = environment.auth.fields
    //多要素認証
    const mfa = environment.auth.mfa

    //フォームコントロール初期化
    if (availableFields.username) {
      this.username = fb.control('', [])
    }
    if (availableFields.email) {
      this.email = fb.control('', [Validators.email])
    }
    if (availableFields.phone_number) {
      this.phoneNumber = fb.control('', [])
    }
    this.password = fb.control('', [
      AuthValidators.password()
    ])
    this.confirmPassword = fb.control('', [ AuthValidators.confirmPassword(this.password) ])

    this.terms = fb.control(false, [Validators.requiredTrue])
    
    if ((mfa.email && !mfa.confirmEmailLink) || mfa.phone_number) {
      this.verifyCode = fb.control('', [ AuthValidators.verifyCode() ])
    }

    //フォームグループ初期化
    this.form = fb.group({})
    if (availableFields.username) {
      this.form.addControl('username', this.username)
    }
    if (availableFields.email) {
      this.form.addControl('email', this.email)
    }
    if (availableFields.phone_number) {
      this.form.addControl('phoneNumber', this.phoneNumber)
    }
    this.form.addControl('password', this.password)
    this.form.addControl('confirmPassword', this.confirmPassword)
    this.form.addControl('terms', this.terms)
    //this.form.addControl('verifyCode', this.verifyCode)

    this.socialLinks.push({
      title: 'Googleでログイン',
      icon: 'google',
      link: '../idp/google',
    });
  }

  /**
   * サインアップ処理
   */
  signUp(): void {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    //有効フィールド
    const availableFields = environment.auth.fields
    const username = availableFields.username ? this.username.value : this.email.value
    const password = this.password.value
    const email = availableFields.email ? this.email.value : null
    const phone_number = availableFields.phone_number ? this.phoneNumber.value : null

    const attributes = {}
    if (availableFields.email) attributes['email'] = email
    if (this.phoneNumber) attributes['phone_number'] = phone_number

    //サインアップ後は確認コードが送信される
    this.authService.signUp({
      username: username,
      password,
      attributes: attributes,
      validationData: [],  // optional
    })
    .then(result => {
      if (result.errorCode) {
        //ユーザーはすでに登録済み
        if (result.errorCode === 'UsernameExistsException') {
          this.errorMessage = this.translateService.instant(`AuthErrors.${result.errorCode}`)
        } else {
          //不明エラー
          console.error(result);
        }
        this.submitted = false
      } else {
        if (result.userConfirmed) {
          //サインアップ成功
          //リダイレクト
          this.route.fragment.pipe(first()).subscribe(fragment => {
            if (fragment) {
              //リダイレクト
              this.router.navigate([fragment])
            } else {
              this.router.navigate(['/'])
            }
          })
        } else {
          //認証コード入力
          const mfa = environment.auth.mfa
          if ((mfa.email && !mfa.confirmEmailLink) || mfa.phone_number) {
            //フリップカードを裏向ける
            this.flipCard.flipped = true
          }
        }
        this.submitted = false

      }
    })
  }

  /**
   * 確認コード検証
   * @param evt 
   */
  confirmVerifyCode(evt: Event) {

    this.errorMessage = ''

    if (this.verifyCode.invalid) {
      return
    }

    this.submitted = true

    //有効フィールド
    const availableFields = environment.auth.fields
    const username = availableFields.username ? this.username.value : this.email.value
    //確認コード
    const verifyCode = this.verifyCode.value
    // After retrieveing the confirmation code from the user
    Auth.confirmSignUp(username, verifyCode, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true,
      
    }).then(data => {

      this.submitted = false

      console.log(data)
      //TODO リダイレクト
      //リダイレクト
      this.route.fragment.pipe(first()).subscribe(fragment => {
        if (fragment) {
          this.router.navigate([fragment])
        } else {
          this.router.navigate(['/'])
        }
      })
    }
    ).catch(err => {
      console.log(err)

      this.errorMessage = this.translateService.instant(`VerifyCodeErrors.${err.code}`)

      this.submitted = false
    });
    }
}
