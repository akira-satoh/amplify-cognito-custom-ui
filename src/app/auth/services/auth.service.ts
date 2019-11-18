import { Injectable } from '@angular/core'
import { AmplifyService } from 'aws-amplify-angular'
import { SignInOpts, SignUpParams } from '@aws-amplify/auth/lib/types'
import { Auth } from 'aws-amplify'
import { CognitoUser } from '@aws-amplify/auth'
import { BehaviorSubject } from 'rxjs'

export type ChallengeNames = 'SMS_MFA' | 'SOFTWARE_TOKEN_MFA' | 'NEW_PASSWORD_REQUIRED' | 'MFA_SETUP'
export type SignUpErrors = 'UsernameExistsException'
export type SignInErrors = 'UserNotConfirmedException' | 'PasswordResetRequiredException' | 'NotAuthorizedException' | 'UserNotFoundException'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** サインイン状態 */
  public signedIn: boolean;

  /** ユーザー情報 */
  public user: any

  constructor(private amplifyService: AmplifyService) {
    this.amplifyService = amplifyService

    this.amplifyService.authStateChange$
      .subscribe(authState => {
        this.signedIn = authState.state === 'signedIn'
        if (!authState.user) {
          this.user = null
        } else {
          this.user = authState.user
        }
      })
  }

  /**
   * サインアップ
   * @param signUpParam 
   */
  async signUp(signUpParam: SignUpParams): Promise<{ user?: CognitoUser, userConfirmed?: boolean, errorCode?: SignUpErrors, error?: any }> {

    //サインアップ後は確認コードが送信される
    return new Promise(async (resolve, reject) => {
      try {
        const result = await Auth.signUp(signUpParam)
        const user = result.user
        const userConfirmed = result.userConfirmed
        resolve({ user, userConfirmed })
        return
      } catch (err) {
        resolve({ errorCode: err.code, error: err })
        return
      }
    })
  }

  /**
   * 確認サインアップ
   * @param username 
   * @param verifyCode 
   */
  async confirmSignUp(username: string, verifyCode: string) {
    // After retrieveing the confirmation code from the user
    return await Auth.confirmSignUp(username, verifyCode, {
      // Optional. Force user confirmation irrespective of existing alias. By default set to True.
      forceAliasCreation: true
    })
  }

  /**
   * サインイン
   * @param signInOpt 
   */
  async signIn(signInOpt: SignInOpts): Promise<{ user?: any, challengeName?: ChallengeNames, errorCode?: SignInErrors, error?: any }> {
    const username = signInOpt.username
    const password = signInOpt.password
    return new Promise(async (resolve, reject) => {
      try {
        const user = await Auth.signIn(username, password)
        resolve({ user, challengeName: user.challengeName })
        if (user.challengeName === 'SMS_MFA' ||
          user.challengeName === 'SOFTWARE_TOKEN_MFA') {
        } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          console.log(user)
        } else if (user.challengeName === 'MFA_SETUP') {
          // This happens when the MFA method is TOTP
          // The user needs to setup the TOTP before using it
          // More info please check the Enabling MFA part
          Auth.setupTOTP(user)
        } else {
          // The user directly signs in
          console.log(user)
        }
      } catch (err) {
        if (err.code === 'UserNotConfirmedException') {
          // The error happens if the user didn't finish the confirmation step when signing up
          // In this case you need to resend the code and confirm the user
          // About how to resend the code and confirm the user, please check the signUp part
          // After retrieveing the confirmation code from the user
          resolve({ errorCode: err.code, error: err })
        } else if (err.code === 'PasswordResetRequiredException') {
          // The error happens when the password is reset in the Cognito console
          // In this case you need to call forgotPassword to reset the password
          // Please check the Forgot Password part.
          resolve({ errorCode: err.code, error: err })
        } else if (err.code === 'NotAuthorizedException') {
          // The error happens when the incorrect password is provided
          resolve({ errorCode: err.code, error: err })
        } else if (err.code === 'UserNotFoundException') {
          // The error happens when the supplied username/email does not exist in the Cognito user pool
          resolve({ errorCode: err.code, error: err })
        } else {
          console.log(err)
          resolve({ errorCode: err.code, error: err })
        }
        resolve({ errorCode: err.code, error: err })
      }
    })
  }

  /**
   * 多要素認証の確認コードアンサー
   * @param user 
   * @param token 
   */
  public async challengeMfaEmailTokenAnswer(user: any, token: string) {
    // You need to get the code from the UI inputs
    // and then trigger the following function with a button click
    const code = token
    // If MFA is enabled, sign-in should be confirmed with the confirmation code
    const mfaType = 'SOFTWARE_TOKEN_MFA'
    const loggedUser = await Auth.confirmSignIn(
      user,   // Return object from Auth.signIn()
      code,   // Confirmation code  
      mfaType // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
    )
    return loggedUser
  }

  /**
   * サインアウト
   */
  public async signOut() {
    return await Auth.signOut()
  }

  /**
   * パスワード再設定
   * @param username 
   */
  public async forgotPassword(username: string) {
    return await Auth.forgotPassword(username)
  }

  /**
   * パスワード回答
   * @param username 
   * @param code 
   * @param password 
   */
  public async forgotPasswordSubmit(username: string, code: string, password: string) {
    return await Auth.forgotPasswordSubmit(username, code, password)
  }

  /**
   * 多要素認証の確認コードアンサー
   * @param user 
   * @param token 
   */
  public async challengeMfaPhoneNumberTokenAnswer(user: any, token: string) {
    // You need to get the code from the UI inputs
    // and then trigger the following function with a button click
    const code = token
    // If MFA is enabled, sign-in should be confirmed with the confirmation code
    const mfaType = 'SMS_MFA'
    const loggedUser = await Auth.confirmSignIn(
      user,   // Return object from Auth.signIn()
      code,   // Confirmation code  
      mfaType // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
    )
    return loggedUser
  }

  /**
   * パスワード変更の強制
   * @param user 
   * @param newPassword 
   * @param attributes 
   */
  public challengeNewPasswordRequire(user: any, newPassword: string, attributes: any) {
    const requiredAttributes = user && user.challengeParam ? user.challengeParam : {} // the array of required attributes, e.g ['email', 'phone_number']
    Object.keys(requiredAttributes).forEach(key => {
      requiredAttributes[key] = attributes[key]
    })
    // You need to get the new password and required attributes from the UI inputs
    // and then trigger the following function with a button click
    // For example, the email and phone_number are required attributes
    return Auth.completeNewPassword(
        user,              // the Cognito User Object
        newPassword,       // the new password
        // OPTIONAL, the required attributes
        requiredAttributes
    )
  }

  /**
   * Email確認
   */
  public async verifyingEmail() {
    return await Auth.verifyCurrentUserAttribute('email')
  }

  /**
   * 確認コードの再送
   * @param username 
   */
  public async resendVerifyCode(username: string) {
    return await Auth.resendSignUp(username)
  }
}
