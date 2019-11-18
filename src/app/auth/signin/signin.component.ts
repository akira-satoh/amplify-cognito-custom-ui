import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { NbAuthSocialLink } from '@nebular/auth';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';
import { NbFlipCardComponent } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthValidators } from '../auth-validators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements AfterViewInit {

  /** フォーム */
  form: FormGroup;
  /** ユーザー名 */
  username: FormControl;
  /** Email */
  email: FormControl;
  /** 電話番号 */
  phoneNumber: FormControl;
  /** パスワード */
  password: FormControl;
  /** リメンバミー */
  rememberMe: FormControl;
  /** 確認コード */
  verifyCode: FormControl;
  /** 新しいパスワード */
  newPassword: FormControl;
  /** 新しいパスワード（確認入力） */
  confirmNewPassword: FormControl;
  /** 送信中 */
  submitted: boolean = false;
  /** ソーシャルリンク */
  socialLinks: NbAuthSocialLink[] = [];
  /** エラーメッセージ */
  errorMessage: string;

  /** 確認コードフォーム */
  showVerifyCodeForm: boolean;
  /** パスワードリセットフォーム */
  showResetPasswordForm: boolean;

  @ViewChild('flipCard', { static: false })
  flipCard: NbFlipCardComponent

  /** ユーザー */
  user: any;

  /**
   * パスワード最小長
   */
  get passwordMinLength() {
    return environment.auth.passwordPolicy.minLength
  }

  constructor(
    fb: FormBuilder,
    private authService: AuthService,
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute) {
    //有効フィールド
    const availableFields = environment.auth.fields
    //多要素認証
    const mfa = environment.auth.mfa
    //フォームコントロール初期化
    if (availableFields.username) {
      this.username = fb.control('');
    }
    if (availableFields.email) {
      this.email = fb.control('');
    }
    if (availableFields.phone_number) {
      this.phoneNumber = fb.control('');
    }
    this.password = fb.control('');
    this.rememberMe = fb.control(true);
    if ((mfa.email && !mfa.confirmEmailLink) || mfa.phone_number) {
      this.verifyCode = fb.control('', [ AuthValidators.verifyCode() ]);
    }

    this.newPassword = fb.control('', [ AuthValidators.password() ]);
    this.confirmNewPassword = fb.control('', [ AuthValidators.confirmPassword(this.newPassword) ])

    this.showResetPasswordForm = false;

    //フォームグループ初期化
    this.form = fb.group({});
    if (availableFields.username) {
      this.form.addControl('username', this.username);
    }
    if (availableFields.email) {
      this.form.addControl('email', this.email);
    }
    if (availableFields.phone_number) {
      this.form.addControl('phoneNumber', this.phoneNumber);
    }
    this.form.addControl('password', this.password);
    this.form.addControl('rememberMe', this.rememberMe);
  }

  ngOnInit(): void {
    //リロードによるサインイン確認前のリダイレクト
    this.route.fragment.pipe(first()).subscribe(fragment => {
      //リダイレクトされてきた
      if (fragment) {
        //サインインされている
        if (this.authService.signIn) {
          //元のページにリダイレクト
          this.router.navigate([fragment])
        }
      }
    })
  }

  ngAfterViewInit() {
  }

  /**
   * サインイン処理
   */
  async signIn() {

    if (this.password.invalid) {
      return
    }

    this.submitted = true
    this.errorMessage = ''
    //有効フィールド
    const availableFields = environment.auth.fields
    const username = availableFields.username ? this.username.value : this.email.value;
    const password = this.password.value;
    this.authService.signIn({ username, password })
      .then(result => {
        if (!result.errorCode) {
          if (result.challengeName === 'NEW_PASSWORD_REQUIRED') {
            //仮パスワードのため新しいパスワード設定が必要
            this.showResetPasswordForm = true
            this.showVerifyCodeForm = false
            //フリップカードを裏向ける
            this.flipCard.flipped = true
          } else {
            //サインイン成功
            this.route.fragment.pipe(first()).subscribe(fragment => {
              if (fragment) {
                //リダイレクト
                this.router.navigate([fragment])
              } else {
                this.router.navigate(['/'])
              }
            })
          }
        } else if (result.errorCode === 'UserNotConfirmedException') {
          //確認前ユーザー
          const mfa = environment.auth.mfa
          if ((mfa.email && !mfa.confirmEmailLink) || mfa.phone_number) {
            //確認コードを再送
            this.authService.resendVerifyCode(username)
              .then(data => {
                //確認コード入力フォームON
                this.showVerifyCodeForm = true
                //パスワード再設定入力フォームOFF
                this.showResetPasswordForm = false
                //フリップカードを裏向ける
                this.flipCard.flipped = true
              })
          }
        } else if (result.errorCode === 'UserNotFoundException') {
          //登録なし
          this.flipCard.flipped = false
          this.errorMessage = this.translateService.instant(`AuthErrors.${result.errorCode}`)
        } else if (result.errorCode === 'NotAuthorizedException') {
          //
          this.flipCard.flipped = false
          if (result.error && result.error.message) {
            this.errorMessage = this.translateService.instant(`AuthErrors.NotAuthorizedException.${result.error.message}`)
          } else {
            this.errorMessage = this.translateService.instant(`AuthErrors.${result.errorCode}`)
          }
        } else if (result.errorCode === 'PasswordResetRequiredException') {
          //Cognitoコンソールからパスワードリセット
          //確認コードを送る
          this.authService.forgotPassword(username)
          //確認コード入力フォーム
          this.showVerifyCodeForm = true
          //パスワード変更フォーム
          this.showResetPasswordForm = true
          //フリップカードを裏向ける
          this.flipCard.flipped = true
        } else {
          //その他のエラー
          this.errorMessage = this.translateService.instant(`AuthErrors.${result.errorCode}`)
        }
        this.submitted = false
    }).catch(err => {
        console.error(err)
        this.submitted = false
      })
  }

  /**
   * 新しいパスワードを設定
   */
  signInWithNewPassword() {

    this.submitted = true

    const user = this.username ? this.username.value : this.email.value
    const password = this.newPassword.value
    const verifyCode = this.verifyCode.value
    const attributes = {}
    if (this.authService.user) {
    } else {
      if (this.email) {
        attributes['email'] = this.email.value
      }
      if (this.phoneNumber) {
        attributes['phone_number'] = this.phoneNumber.value
      }
    }

    if (this.showVerifyCodeForm) {
      this.authService.forgotPasswordSubmit(
        user, verifyCode, password
      ).then(result => {
        //正常
        //もう一度サインイン実行
        this.signIn()
        this.submitted = false
      }).catch(err => {
        if (err.code === 'CodeMismatchException') {
          this.errorMessage = this.translateService.instant(`VerifyCodeErrors.${err.code}`)
        }
        this.submitted = false
      })
    } else {
      this.authService.challengeNewPasswordRequire(
        user, password, attributes
      ).then(result => {
        this.submitted = false
      }).catch(err => {
        this.submitted = false
      })
    }
  }

  /**
   * 確認コードを確認
   * @param evt 
   */
  async confirmVerifyCode() {

    this.errorMessage = ''

    if (this.verifyCode.invalid) {
      return
    }

    this.submitted = true

    const verifyCode: string = this.verifyCode.value

    //有効フィールド
    const availableFields = environment.auth.fields
    const username = availableFields.username ? this.username.value : this.email.value
    const password = this.password.value
    const email = availableFields.email ? this.email.value : null
    const phone_number = availableFields.phone_number ? this.phoneNumber.value : null

    const attributes = {}
    if (availableFields.email) attributes['email'] = email
    if (this.phoneNumber) attributes['phone_number'] = phone_number

    //サインイン後は確認コードが送信される
    try {
      const result = await this.authService.confirmSignUp(username, verifyCode)
      if (result.errorCode) {
        //ユーザーはすでに登録済み
        if (result.errorCode === 'UsernameExistsException') {
          //Email認証
          this.authService.challengeMfaEmailTokenAnswer(result.user, verifyCode)
            .then(data => {
              console.log(data)
            })
        } else {
          //不明エラー
          console.error(result);
        }
        this.submitted = false
      }
    } catch (err) {
      console.error(err)
      this.submitted = false
    }
  }
}
