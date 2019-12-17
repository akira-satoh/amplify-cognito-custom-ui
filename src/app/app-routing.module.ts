import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnonAllowComponent } from './anon-allow/anon-allow.component';
import { AuthAllowComponent } from './auth-allow/auth-allow.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'anon-allow', component: AnonAllowComponent },
  { path: 'auth-allow-a', component: AuthAllowComponent, canActivate: [AuthGuard] },
  { path: 'auth-allow-b', component: AuthAllowComponent, canActivate: [AuthGuard] },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'anon-pages', loadChildren: () => import('./anon-pages/anon-pages.module').then(m => m.AnonPagesModule) },
  { path: 'auth-pages', canLoad: [AuthGuard], loadChildren: () => import('./auth-pages/auth-pages.module').then(m => m.AuthPagesModule) },
  { path: 'auth-pages-child', canActivateChild: [AuthGuard], loadChildren: () => import('./auth-pages-child/auth-pages-child.module').then(m => m.AuthPagesChildModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
