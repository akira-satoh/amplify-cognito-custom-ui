// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    /** サインイン属性 */
    fields: {
      username: false,
      email: true,
      phone_number: false,
      //必須の標準属性
      address: false,
      birthdate: false,
      family_name: false,
      gender: false,
      given_name: false,
      locale: false,
      middle_name: false,
      name: false,
      nickname: false,
      picture: false,
      preferred_username: false,
      profile: false,
      zoneinfo: false,
      updated_at: false,
      website: false,

    },
    /** パスワードポリシー */
    passwordPolicy: {
      /** 最小長 */
      minLength: 8,
      /**  */
      includesChar: {
        /** 数字を必要とする */
        numeric: true,
        /** 小文字を必要とする */
        lowerAlpha: false,
        /** 大文字を必要とする */
        upperAlpha: false,
        /** 特殊文字を要求する */
        symbol: false
      }
    },
    /** 多要素認証 */
    mfa: {
      email: true,
      phone_number: false,
      /** 確認リンク */
      confirmEmailLink: false,
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
