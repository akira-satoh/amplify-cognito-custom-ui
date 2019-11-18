# 

```sh
amplify add auth
```

 Do you want to use the default authentication and security configuration? 
  (デフォルトの認証およびセキュリティ構成を使用しますか？)
  Default configuration 
  Default configuration with Social Provider (Federation) 
❯ Manual configuration 
  I want to learn more. 

Please note that certain attributes may not be overwritten if you choose to use defaults settings.
Using service: Cognito, provided by: awscloudformation
(デフォルト設定の使用を選択した場合、特定の属性が上書きされない場合があることに注意してください。)
 What do you want to do? (何をしたいですか？)
  Apply default configuration with Social Provider (Federation) 
  (ソーシャルプロバイダー（フェデレーション）でデフォルト構成を適用する)
❯ Walkthrough all the auth configurations 
  (すべての認証設定をウォークスルーする)

 Select the authentication/authorization services that you want to use: 
  (使用する認証/承認サービスを選択します。)
  User Sign-Up, Sign-In, connected with AWS IAM controls (Enables per-user Storage features for images or other content
, Analytics, and more) 
  (AWS IAMコントロールに接続されたユーザーサインアップ、サインイン（イメージまたはその他のコンテンツのユーザーごとのストレージ機能を有効にします
、分析など）)
❯ User Sign-Up & Sign-In only (Best used with a cloud API only) 
  (ユーザーのサインアップとサインインのみ（クラウドAPIでのみ使用するのが最適）)
  I want to learn more. 
  (私はもっ​​と習いたいです。)

 Please provide a friendly name for your resource that will be used to label this category in the project:
  (プロジェクトのこのカテゴリのラベル付けに使用されるリソースのわかりやすい名前を入力してください：)
  ampcogcustui

 Please provide a name for your user pool:
  (ユーザープールの名前を入力してください：)
  ampcogcustui-userpool

 How do you want users to be able to sign in?
  (ユーザーがどのようにサインインできるようにしたいですか？)
  Username 
  Email 
  Phone Number 
❯ Email and Phone Number 
  I want to learn more. 
  
 Multifactor authentication (MFA) user login options: 
  (多要素認証（MFA）ユーザーのログインオプション)
  OFF
  - ON (Required for all logins, can not be enabled later) (Disabled)
       (すべてのログインに必要で、後で有効にすることはできません)
❯ OPTIONAL (Individual users can use MFA) 
           (個々のユーザーはMFAを使用できます)
  I want to learn more. 
  (私はもっ​​と習いたいです。)

 For user login, select the MFA types: (Press <space> to select, <a> to toggle all, <i> to invert selection)
 (ユーザーログインの場合、MFAタイプを選択します)
❯◉ SMS Text Message
 ◉ Time-Based One-Time Password (TOTP)

Please specify an SMS authentication message:
 (SMS認証メッセージを指定してください：)
 Amplify Cognito Custom UIの確認コード{####}

Email based user registration/forgot password:
 (メールベースのユーザー登録/パスワードを忘れた場合：)
❯ Enabled (Requires per-user email entry at registration) 
  (有効（登録時にユーザーごとの電子メールエントリが必要）)
  Disabled (Uses SMS/TOTP as an alternative) 
  (無効（代わりにSMS / TOTPを使用）)

Please specify an email verification subject:
 (メール確認の件名を指定してください：)
 Amplify Cognito Custom UIの確認コード

Please specify an email verification message:
 (メール確認メッセージを指定してください：)
 Amplify Cognito Custom UIの確認コード{####}

Do you want to override the default password policy for this User Pool?
 (このユーザープールのデフォルトのパスワードポリシーを上書きしますか？)
 y

Enter the minimum password length for this User Pool:
 (このユーザープールの最小パスワード長を入力します。)
 8

Select the password character requirements for your userpool:
 (ユーザープールのパスワード文字の要件を選択します。)
 ◯ Requires Lowercase
 ◯ Requires Uppercase
❯◉ Requires Numbers
 ◯ Requires Symbols

Specify the app's refresh token expiration period (in days):
 (アプリの更新トークンの有効期限（日単位）を指定します。:)
 30

Do you want to specify the user attributes this app can read and write?
 (このアプリが読み書きできるユーザー属性を指定しますか？)
 y

Specify read attributes:
 (読み取り属性を指定します。)
 ◉ Email
 ◉ Family Name
 ◉ Middle Name
 ◉ Gender
 ◉ Locale
 ◉ Given Name
 ◉ Name
 ◉ Nickname
 ◉ Phone Number
 ◉ Preferred Username
 ◉ Picture
 ◉ Profile
 ◉ Updated At
 ◉ Website
 ◉ Zone Info
 ◉ Email Verified?
 ◉ Phone Number Verified?
 ◉ Address
 ◉ Birthdate

Specify write attributes:
 (書き込み属性を指定します。)
 ◉ Email
 ◉ Family Name
 ◉ Middle Name
 ◉ Gender
 ◉ Locale
 ◉ Given Name
 ◉ Name
 ◉ Nickname
 ◉ Phone Number
 ◉ Preferred Username
 ◉ Picture
 ◉ Profile
 ◉ Updated At
 ◉ Website
 ◉ Zone Info
 ◉ Email Verified?
 ◉ Phone Number Verified?
 ◉ Address
 ◉ Birthdate

Do you want to enable any of the following capabilities?
 (次の機能のいずれかを有効にしますか？)
❯◯ Add Google reCaptcha Challenge
   (Google reCaptcha Challengeを追加)
 ◯ Email Verification Link with Redirect
   (リダイレクト付きのメール確認リンク)
 ◯ Add User to Group
   (グループにユーザーを追加)
 ◯ Email Domain Filtering (blacklist)
   (メールドメインフィルタリング（ブラックリスト）)
 ◯ Email Domain Filtering (whitelist)
   (メールドメインフィルタリング（ホワイトリスト）)
 ◯ Custom Auth Challenge Flow (basic scaffolding - not for production)
   (カスタム認証チャレンジフロー（基本的な足場-本番用ではありません）)
 ◯ Override ID Token Claims
   (IDトークンクレームのオーバーライド)

Do you want to use an OAuth flow?
 (OAuthフローを使用しますか？)
❯ Yes 
  No 
  I want to learn more. 

What domain name prefix you want us to create for you?
 (作成してほしいドメイン名プレフィックスは何ですか？)
 ampcogcustui

Enter your redirect signin URI: 
 (リダイレクトサインインURIを入力します。)
 http://localhost:4200/auth/signin/

Do you want to add another redirect signin URI
 (別のリダイレクトサインインURIを追加しますか)
 n

Enter your redirect signout URI:
 (リダイレクトサインアウトURIを入力します。)
 http://localhost:4200/auth/signout/

Do you want to add another redirect signout URI
 (別のリダイレクトサインアウトURIを追加しますか)
 n

Select the OAuth flows enabled for this project.
 (このプロジェクトで有効なOAuthフローを選択します。)
❯ Authorization code grant 
  Implicit grant 

Select the OAuth scopes enabled for this project.
 (このプロジェクトで有効になっているOAuthスコープを選択します。)
 ◉ Email
 ◉ OpenID
 ◉ Profile
 ◉ aws.cognito.signin.user.admin

# ここはユーザー属性が関連して選べないかも
Select the identity providers you want to configure for your user pool:
 (ユーザープール用に構成するIDプロバイダーを選択します。)
❯◉ Facebook
 ◉ Google
 ◯ Login With Amazon

 Enter your Facebook App ID for your OAuth flow: 
  (OAuthフローのFacebookアプリIDを入力します。)
 xxxxxxxxx

 Enter your Facebook App Secret for your OAuth flow:  
  (OAuthフローのFacebookアプリシークレットを入力します。)
 xxxxxxxxx

 Enter your Google Web Client ID for your OAuth flow:
  (OAuthフローのGoogle WebクライアントIDを入力します。)
 xxxxxxxxx

 Enter your Google Web Client Secret for your OAuth flow:
  (OAuthフローのGoogle Webクライアントシークレットを入力します。)
 xxxxxxxxx

 Do you want to configure Lambda Triggers for Cognito?
  (Cognito用にLambdaトリガーを設定しますか？)
 n
