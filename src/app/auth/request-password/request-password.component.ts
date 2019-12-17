import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbFlipCardComponent } from '@nebular/theme';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { AuthValidators } from '../auth-validators';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})
export class RequestPasswordComponent implements OnInit {

  @ViewChild('flipCard', { static: true })
  flipCard: NbFlipCardComponent;

  /** フォーム */
  form: FormGroup;
  /** ユーザー名 */
  username: FormControl;
  /** Email */
  email: FormControl;
  /** 電話番号 */
  phoneNumber: FormControl;
  /** 新しいパスワード */
  newPassword: FormControl;
  /** 新しいパスワード（確認入力） */
  confirmNewPassword: FormControl;
  /** 確認コード */
  verifyCode: FormControl;

  /** エラーメッセージ */
  errorMessage: string;

  /** 送信中 */
  submitted = false;
  /** リクエスト完了 */
  completed = false;

  /**
   * パスワード最小長
   */
  get passwordMinLength() {
    return environment.auth.passwordPolicy.minLength
  }

  constructor(fb: FormBuilder,
    private authService: AuthService,
    private translateService: TranslateService) {
    this.username = fb.control('', [ Validators.required ])
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
    if ((mfa.email && !mfa.confirmEmailLink) || mfa.phone_number) {
      this.verifyCode = fb.control('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
    }
    this.newPassword = fb.control('', [ AuthValidators.password() ])
    this.confirmNewPassword = fb.control('', [AuthValidators.confirmPassword(this.newPassword)])

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
    this.form.addControl('verifyCode', this.verifyCode)
    this.form.addControl('newPassword', this.newPassword)
    this.form.addControl('confirmNewPassword', this.confirmNewPassword)

  }

  ngOnInit() {
  }

  /**
   * パスワードをリクエスト
   * @param evt 
   */
  async requestPassword(evt: any) {
    try {
      this.submitted = true
      const username = this.username.value
      this.authService.forgotPassword(username)
      this.flipCard.flipped = true
    } catch (err) {
      console.error(err)
    } finally {
      this.submitted = false
    }
  }

  requestNewPassword() {

    if (this.verifyCode.invalid
      || this.newPassword.invalid
      || this.confirmNewPassword.invalid) {
      return
    }

    this.submitted = true

    const user = this.username.value
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

    this.authService.forgotPasswordSubmit(
      user, verifyCode, password
    ).then(result => {
      //正常
      this.errorMessage = ''
      this.completed = true
    }).catch(err => {
      if (err.code === 'CodeMismatchException') {
        this.errorMessage = this.translateService.instant(`VerifyCodeErrors.${err.code}`)
      }
      this.submitted = false
    })
  }

}
