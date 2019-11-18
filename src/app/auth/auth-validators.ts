import { AbstractControl } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { isNullOrUndefined } from 'util';

/**
 * 検証クラス
 */
export class AuthValidators {
  /**
   * パスワードバリデータ
   */
  public static password = () => ((control: AbstractControl) => {
    const value = control.value
    if (!value) {
      return null
    }
    const includesChar = environment.auth.passwordPolicy.includesChar
    if (includesChar.lowerAlpha && !/[a-z]/.test(value)) {
      //小文字が含まれていない
      return { 'includesChar': 'lowerAlpha' }
    } else if (includesChar.upperAlpha && !/[A-Z]/.test(value)) {
      //大文字が含まれていない
      return { 'includesChar': 'upperAlpha' }
    } else if (includesChar.symbol && !/[!-/:-@\[-`\{\|\}~]/.test(value)) {
      //記号が含まれていない
      return { 'includesChar': 'symbol' }
    } else if (includesChar.numeric && !/[0-9]/.test(value)) {
      //数字が含まれていない
      return { 'includesChar': 'numeric' }
    }
    return null
  })

  /**
   * 確認パスワードバリデータ
   */
  public static confirmPassword = (passwordControl: AbstractControl) => ((control: AbstractControl) => {
    if (control.value.length > 0 && passwordControl.value !== control.value) {
      return { 'different': control.value }
    }
    return null
  })

  /**
   * 確認コードバリデータ
   */
  public static verifyCode = () => ((control: AbstractControl) => {
    const value: string = control.value
    if (isNullOrUndefined(value) || !value.length) {
      return { 'required': 'required' }
    } else if (value.length < 6) {
      return { 'minLength': value.length }
    } else if (value.length > 6) {
      return { 'maxLength': value.length }
    }
    return null
  });
}
