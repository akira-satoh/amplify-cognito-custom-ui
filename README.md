# Amplify+Cognito+NebularのカスタムUIで認証サンプル

## 作成手順

### プロジェクトの作成 
```sh
ng new amplify-cognito-custom-ui --directory ./ --force
npm install aws-amplify
npm install aws-amplify-angular
ng add @nebular/theme
npm install @nebular/auth
```

### Polyfillsを編集
Angular 6+でAmplifyを動かすのに必要
```typescript:polyfills.ts
(window as any).global = window;
(window as any).process = {
  env: { DEBUG: undefined },
};
```

#### Amplify構成ファイルを追加
```sh
amplify init
amplify add auth
amplify push
```
pushしたのを消す場合は
```sh
amplify delete
```

### コンパイラ設定
ArrayBufferでコンパイルエラーが出るのでtypesにnodeを追加するかtypesを消しておく
```json:tsconfig.app.json
{
  // ...
  "compilerOptions": {
    // ...
    "types": ["node"]
  },
  // ...
}
```
amplify initで作られるaws-exports.jsをインポートできるように設定
```json:tsconfig.json
{
  // ...
  "compilerOptions": {
    // ...
    "allowJs": true
  },
  // ...
}
```

### Amplifyの構成ファイルをロード
```typescript:main.ts
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
```

### モジュール追加
認証機能を他へ取り込みやすいようモジュール化と遅延ロードでルーティングに追加
```
ng g module auth --routing --routing-scope=Root --route=/auth --module=app
```

アプリケーションのルートモジュールにAmplify Angularモジュールをインポート
AmplifyServiceはルートへの自動インジェクションが施されていないので明示しないとならない
```typescript:app.module.ts
// ...
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  // ...
  imports: [
    // ...
    AmplifyAngularModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule
  ],
  providers: [
    //...
    AmplifyService
  ]
})
// ...
```
### サブモジュールにも追加
サブモジュール内のテンプレートにamplifyコンポーネントを使うため。
Serviceはなくてもいい。
```typescript:auth.module.ts
// ...
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';
import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';

@NgModule({
  // ...
  imports: [
    // ...
    AmplifyAngularModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: '',
          login: {
            endpoint: '/auth/signin',
          },
          register: {
            endpoint: '/auth/signup',
          },
          logout: {
            endpoint: '/auth/signout',
          }
        })
      ],
      forms: {}
    })
  ],
  providers: [
    // ...
    AmplifyService
  ]
})
// ...
```



### 認証サービスを追加
```sh
ng g service auth/services/auth
```

```typescript:auth.service.ts
// ...
export class AuthService {
  constructor(private amplifyService: AmplifyService) {
    this.amplifyService = amplifyService;
  
    this.amplifyService.authStateChange$
      .subscribe(authState => {
      this.signedIn = authState.state === 'signedIn';
      if (!authState.user) {
        this.user = null;
      } else {
        this.user = authState.user;
      }
      });
  }
  // ...
```

### 認証コンポーネントを作成
```sh
ng g c auth/signin --module auth
ng g c auth/signup --module auth
ng g c auth/signout --module auth
```

### ログインフォームを作成
```html:auth.component.html
<amplify-authenticator></amplify-authenticator>
```
```typescript:auth.component.ts
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService) { }
  // ...
}
```

スタイルの適用
```json:angular.json
{
  // ...
  "projects": {
    "amplify-cognito": {
      // ...
      "architect": {
        "build": {
          // ...
          "options": {
            // ...
            "styles": [
              // ...
              "node_modules/aws-amplify-angular/ionic.css"
            ],
            // ...
```

### ガードの作成

```sh
ng g guard auth/auth --implements=CanActivate --implements=CanActivateChild --implements=CanLoad
```

### ガードの確認
テスト用ページ作成
```sh
ng g c anon-allow
ng g c auth-allow
ng g module anon-pages --routing --routing-scope=Root --route=/anon-pages --module=app
ng g module auth-pages --routing --routing-scope=Root --route=/auth-pages --module=app
ng g module auth-pages-child --routing --routing-scope=Root --route=/auth-pages-child --module=app
ng g c auth-pages/example-a --module=auth-pages
ng g c auth-pages/example-b --module=auth-pages
ng g c auth-pages-child/example-c --module=auth-pages-child
ng g c auth-pages-child/example-d --module=auth-pages-child
```
```typescript:app-routing.module.ts
const routes: Routes = [
  // ...
  { path: 'anon-allow', component: AnonAllowComponent },
  { path: 'auth-allow-a', component: AuthAllowComponent, canActivate: [AuthGuard] },
  { path: 'auth-allow-b', component: AuthAllowComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'anon-pages', loadChildren: () => import('./anon-pages/anon-pages.module').then(m => m.AnonPagesModule) },
  { path: 'auth-pages', canLoad: [AuthGuard], loadChildren: () => import('./auth-pages/auth-pages.module').then(m => m.AuthPagesModule) },
  { path: 'auth-pages-child', canActivateChild: [AuthGuard], loadChildren: () => import('./auth-pages-child/auth-pages-child.module').then(m => m.AuthPagesChildModule) }
  // ...
];
```
