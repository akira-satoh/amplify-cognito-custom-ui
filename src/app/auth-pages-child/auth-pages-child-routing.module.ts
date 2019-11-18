import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPagesChildComponent } from './auth-pages-child.component';
import { ExampleCComponent } from './example-c/example-c.component';
import { ExampleDComponent } from './example-d/example-d.component';

const routes: Routes = [
  { path: '', component: AuthPagesChildComponent },
  { path: 'example-c', component: ExampleCComponent },
  { path: 'example-d', component: ExampleDComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthPagesChildRoutingModule { }
